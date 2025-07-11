import { Either, left, right } from 'src/core/either';
import { UserNotFoundError } from './errors/user-not-found.error';
import { Injectable } from '@nestjs/common';
import { MagicLinkToken } from '../../enterprise/entities/magic-link-token.entity';
import { MagicLinkTokensRepository } from '../repositories/magic-link-tokens.repository';
import { UsersRepository } from '../repositories/users.repository';
import { MailSender } from '../mail/mail-sender';

interface SendMagicLinkViaEmailUseCaseRequest {
  readonly email: string;
  readonly frontEndMagicLink: string;
}

type SendMagicLinkViaEmailUseCaseResponse = Either<UserNotFoundError, null>;

const ONE_HOUR = 60 * 60 * 1000;

@Injectable()
export class SendMagicLinkViaEmailUseCase {
  constructor(
    private magiLinkTokensRepository: MagicLinkTokensRepository,
    private usersRepository: UsersRepository,
    private mailSender: MailSender,
  ) {}

  async execute({
    email,
    frontEndMagicLink,
  }: SendMagicLinkViaEmailUseCaseRequest): Promise<SendMagicLinkViaEmailUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new UserNotFoundError());
    }

    const magicLinkToken = MagicLinkToken.create({
      userId: user.id,
      expiresAt: new Date(Date.now() + ONE_HOUR),
    });

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
