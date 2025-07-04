import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { OtpCodesRepository } from 'src/database/repositories/otp-codes.repository';
import { UsersRepository } from 'src/database/repositories/users.repository';
import { Encrypter } from 'src/security/cryptography/encrypter';
import { InvalidAuthCode } from './errors/invalid-auth-code.error';
import { UserNotFoundError } from './errors/user-not-found.error';
import { UserStatus } from 'src/entities/user.entity';

interface LoginWithOtpUseCaseRequest {
  codeNumber: number;
}

type LoginWithOtpUseCaseResponse = Either<
  InvalidAuthCode | UserNotFoundError,
  {
    readonly accessToken: string;
  }
>;

@Injectable()
export class LoginWithOtpUseCase {
  constructor(
    private otpCodesRepository: OtpCodesRepository,
    private usersRepository: UsersRepository,
    private encrypter: Encrypter,
  ) {}

  async execute({
    codeNumber,
  }: LoginWithOtpUseCaseRequest): Promise<LoginWithOtpUseCaseResponse> {
    const otpCode =
      await this.otpCodesRepository.findValidByCodeNumber(codeNumber);

    if (!otpCode) return left(new InvalidAuthCode());

    if (otpCode.isConsumed()) return left(new InvalidAuthCode());

    if (otpCode.isExpired()) return left(new InvalidAuthCode());

    const user = await this.usersRepository.findById(otpCode.userId.toString());

    if (!user) return left(new UserNotFoundError());

    user.status = UserStatus.REQUIRE_CHANGE_PASSWORD;

    await this.usersRepository.save(user);

    otpCode.markAsConsumed();

    await this.otpCodesRepository.save(otpCode);

    const accessToken = await this.encrypter.encrypt({
      payload: {
        sub: user.id.toString(),
      },
    });

    return right({ accessToken });
  }
}
