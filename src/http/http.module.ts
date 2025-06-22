import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RegisterAccountController } from './controllers/register-account.controller';
import { AuthenticateWithEmailController } from './controllers/authenticate-with-email.controller';
import { RegisterAccountUseCase } from 'src/use-cases/register-account.use-case';
import { AuthenticateWithEmailUseCase } from 'src/use-cases/authenticate-with-email.use-case';
import { AuthModule } from 'src/security/auth/auth.module';
import { CryptographyModule } from 'src/security/cryptography/cryptography.module';
import { ForgotPasswordController } from './controllers/forgot-password.controller';
import { SendResetPasswordLinkUseCase } from 'src/use-cases/send-reset-password-link.use-case';
import { ChangePasswordController } from './controllers/change-password.controller';
import { ChangePasswordUseCase } from 'src/use-cases/change-password.use-case';

@Module({
  imports: [DatabaseModule, AuthModule, CryptographyModule],
  controllers: [
    AuthenticateWithEmailController,
    ForgotPasswordController,
    RegisterAccountController,
    ChangePasswordController
  ],
  providers: [
    RegisterAccountUseCase,
    SendResetPasswordLinkUseCase,
    AuthenticateWithEmailUseCase,
    ChangePasswordUseCase
  ],
})
export class HttpModule {}
