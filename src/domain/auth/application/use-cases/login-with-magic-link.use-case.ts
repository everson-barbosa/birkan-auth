import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { Encrypter } from 'src/domain/auth/application/cryptography/encrypter';
import { InvalidAuthCode } from './errors/invalid-auth-code.error';
import { UserNotFoundError } from './errors/user-not-found.error';
import { UserStatus } from '../../enterprise/entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';
import { MagicLinkTokensRepository } from '../repositories/magic-link-tokens.repository';

interface LoginWithMagicLinkUseCaseRequest {
  id: string;
}

type LoginWithMagicLinkUseCaseResponse = Either<
  InvalidAuthCode | UserNotFoundError,
  {
    readonly accessToken: string;
  }
>;

@Injectable()
export class LoginWithMagicLinkUseCase {
  constructor(
    private magicLinkTokensRepository: MagicLinkTokensRepository,
    private usersRepository: UsersRepository,
    private encrypter: Encrypter,
  ) {}

  async execute({
    id,
  }: LoginWithMagicLinkUseCaseRequest): Promise<LoginWithMagicLinkUseCaseResponse> {
    const magicLinkToken = await this.magicLinkTokensRepository.findById(id);

    if (!magicLinkToken) return left(new InvalidAuthCode());

    if (magicLinkToken.isConsumed()) return left(new InvalidAuthCode());

    if (magicLinkToken.isExpired()) return left(new InvalidAuthCode());

    const user = await this.usersRepository.findById(
      magicLinkToken.userId.toString(),
    );

    if (!user) return left(new UserNotFoundError());

    user.status = UserStatus.REQUIRE_CHANGE_PASSWORD;

    await this.usersRepository.save(user);

    magicLinkToken.markAsConsumed();

    await this.magicLinkTokensRepository.save(magicLinkToken);

    const accessToken = await this.encrypter.encrypt({
      payload: {
        sub: user.id.toString(),
      },
    });

    return right({ accessToken });
  }
}
