import { Module } from '@nestjs/common';
import { GetUserByIdUseCase } from 'src/domain/auth/application/use-cases/get-user-by-id.use-case';
import { LoginWithEmailUseCase } from 'src/domain/auth/application/use-cases/login-with-email.use-case';
import { LoginWithMagicLinkUseCase } from 'src/domain/auth/application/use-cases/login-with-magic-link.use-case';
import { RegisterAccountUseCase } from 'src/domain/auth/application/use-cases/register-account.use-case';
import { ResetPasswordUseCase } from 'src/domain/auth/application/use-cases/reset-password.use-case';
import { SendMagicLinkViaEmailUseCase } from 'src/domain/auth/application/use-cases/send-magic-link-via-mail.use-case';
import { DatabaseModule } from '../database/database.module';
import { MailModule } from '../mail/mail.module';
import { AuthModule } from '../security/auth/auth.module';
import { CryptographyModule } from '../security/cryptography/cryptography.module';
import { GetCurrentUserController } from './controllers/get-current-user.controller';
import { LoginWithEmailController } from './controllers/login-with-email.controller';
import { LoginWithMagicLinkController } from './controllers/login-with-magic-link.controller';
import { LogoutController } from './controllers/logout.controller';
import { RegisterAccountController } from './controllers/register-account.controller';
import { ResetPasswordController } from './controllers/reset-password.controller';
import { SendMagicLinkViaEmailController } from './controllers/send-magic-link-via-email.controller';

@Module({
  imports: [DatabaseModule, AuthModule, CryptographyModule, MailModule],
  controllers: [
    LoginWithEmailController,
    LoginWithMagicLinkController,
    LogoutController,
    SendMagicLinkViaEmailController,
    RegisterAccountController,
    ResetPasswordController,
    GetCurrentUserController,
  ],
  providers: [
    LoginWithEmailUseCase,
    LoginWithMagicLinkUseCase,
    RegisterAccountUseCase,
    ResetPasswordUseCase,
    GetUserByIdUseCase,
    SendMagicLinkViaEmailUseCase,
  ],
})
export class HttpModule {}
