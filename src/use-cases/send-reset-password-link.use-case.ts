import { Either, left, right } from "src/core/either";
import { UsersRepository } from "src/database/repositories/users.repository";
import { UserNotFoundError } from "./errors/user-not-found.error";
import { MailService } from "src/mail/mail.service";
import { Injectable } from "@nestjs/common";
import { Encrypter } from "src/security/cryptography/encrypter";
import { EnvService } from "src/env/env.service";

interface SendResetPasswordLinkUseCaseRequest {
  readonly email: string
}

type SendResetPasswordLinkUseCaseResponse = Either<UserNotFoundError, null>

const SEND_RESET_PASSWORD_TOKEN_PURPOSE = 'reset-password'

@Injectable()
export class SendResetPasswordLinkUseCase {
  constructor (
    private usersRepository: UsersRepository, 
    private mailService: MailService,
    private encrypter: Encrypter,
    private envService: EnvService
  ) {}

  async execute({ email }: SendResetPasswordLinkUseCaseRequest): Promise<SendResetPasswordLinkUseCaseResponse> {
    const userOnDatabase = await this.usersRepository.findByEmail(email)

    if (!userOnDatabase) {
      return left(new UserNotFoundError())
    }

    const resetPasswordToken = await this.encrypter.encrypt({
      payload: {
        sub: userOnDatabase.id.toString(),
        purpose: SEND_RESET_PASSWORD_TOKEN_PURPOSE
      },
      expiresIn: '10m'
    });

    const resetPasswordLink = `${this.envService.get('FRONT_END_MAGIC_LINK')}?token=${resetPasswordToken}`

    await this.mailService.sendMail({
      to: email,
      subject: 'Reset de senha',
      text: `Link: ${resetPasswordLink}`
    })
    
    return right(null);
  }
}