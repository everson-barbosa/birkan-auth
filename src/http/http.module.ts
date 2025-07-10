import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RegisterAccountController } from './controllers/register-account.controller';
import { LoginWithEmailController } from './controllers/login-with-email.controller';
import { RegisterAccountUseCase } from 'src/use-cases/register-account.use-case';
import { LoginWithEmailUseCase } from 'src/use-cases/login-with-email.use-case';
import { AuthModule } from 'src/security/auth/auth.module';
import { CryptographyModule } from 'src/security/cryptography/cryptography.module';
import { SendMagicLinkViaEmailController } from './controllers/send-magic-link-via-email.controller';
import { ResetPasswordController } from './controllers/reset-password.controller';
import { ResetPasswordUseCase } from 'src/use-cases/reset-password.use-case';
import { GetCurrentUserController } from './controllers/get-current-user.controller';
import { LoginWithMagicLinkController } from './controllers/login-with-magic-link.controller';
import { LoginWithMagicLinkUseCase } from 'src/use-cases/login-with-magic-link.use-case';
import { SendMagicLinkViaEmailUseCase } from 'src/use-cases/send-magic-link-via-mail.use-case';
import { GetUserByIdUseCase } from 'src/use-cases/get-user-by-id.use-case';
import { LogoutController } from './controllers/logout.controller';
import { MailModule } from 'src/mail/mail.module';

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
