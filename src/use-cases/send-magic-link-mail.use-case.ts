import { Either, left, right } from 'src/core/either';
import { UsersRepository } from 'src/database/repositories/users.repository';
import { UserNotFoundError } from './errors/user-not-found.error';
import { MailService } from 'src/mail/mail.service';
import { Injectable } from '@nestjs/common';
import { MagicLinkToken } from 'src/entities/magic-link-token.entity';
import { EnvService } from 'src/env/env.service';

interface SendMagicLinkEmailUseCaseRequest {
  readonly email: string;
}

type SendMagicLinkEmailUseCaseResponse = Either<UserNotFoundError, null>;

@Injectable()
export class SendMagicLinkEmailUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private mailService: MailService,
    private envService: EnvService,
  ) {}

  async execute({
    email,
  }: SendMagicLinkEmailUseCaseRequest): Promise<SendMagicLinkEmailUseCaseResponse> {
    const userOnDatabase = await this.usersRepository.findByEmail(email);

    if (!userOnDatabase) {
      return left(new UserNotFoundError());
    }

    const magicLinkToken = MagicLinkToken.create({
      userId: userOnDatabase.id,
      expiresAt: new Date(),
    });

    const frontEndMagicLink = this.envService.get('FRONT_END_MAGIC_LINK');

    const magicLink = `${frontEndMagicLink}?token=${magicLinkToken.id.toString()}`;

    await this.mailService.sendMail({
      to: email,
      subject: 'Reset de senha',
      text: `Link: ${magicLink}`,
    });

    return right(null);
  }
}
