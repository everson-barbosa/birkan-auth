import { Either, left, right } from 'src/core/either';
import { UserNotFoundError } from './errors/user-not-found.error';
import { Injectable } from '@nestjs/common';
import { MagicLinkToken } from '../../enterprise/entities/magic-link-token.entity';
import { MagicLinkTokensRepository } from '../repositories/magic-link-tokens.repository';
import { UsersRepository } from '../repositories/users.repository';
import { EnvService } from 'src/infra/env/env.service';
import { MailSender } from '../mail/mail-sender';

interface SendMagicLinkViaEmailUseCaseRequest {
  readonly email: string;
}

type SendMagicLinkViaEmailUseCaseResponse = Either<UserNotFoundError, null>;

const ONE_HOUR = 60 * 60 * 1000;

@Injectable()
export class SendMagicLinkViaEmailUseCase {
  constructor(
    private magiLinkTokensRepository: MagicLinkTokensRepository,
    private usersRepository: UsersRepository,
    private mailSender: MailSender,
    private envService: EnvService,
  ) {}

  async execute({
    email,
  }: SendMagicLinkViaEmailUseCaseRequest): Promise<SendMagicLinkViaEmailUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new UserNotFoundError());
    }

    const magicLinkToken = MagicLinkToken.create({
      userId: user.id,
      expiresAt: new Date(Date.now() + ONE_HOUR),
    });

    const frontEndMagicLink = this.envService.get('FRONT_END_MAGIC_LINK');

    const magicLink = `${frontEndMagicLink}?token=${magicLinkToken.id.toString()}`;

    await this.magiLinkTokensRepository.create(magicLinkToken);

    await this.mailSender.send({
      to: email,
      subject: 'Reset de senha',
      text: `Link: ${magicLink}`,
    });

    return right(null);
  }
}
