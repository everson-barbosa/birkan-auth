import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RegisterAccountController } from './controllers/register-account.controller';
import { LoginWithEmailController } from './controllers/login-with-email.controller';
import { RegisterAccountUseCase } from 'src/use-cases/register-account.use-case';
import { LoginWithEmailUseCase } from 'src/use-cases/login-with-email.use-case';
import { AuthModule } from 'src/security/auth/auth.module';
import { CryptographyModule } from 'src/security/cryptography/cryptography.module';
import { SendMagicLinkEmailController } from './controllers/send-magic-link-email.controller';
import { ChangePasswordController } from './controllers/change-password.controller';
import { ChangePasswordUseCase } from 'src/use-cases/change-password.use-case';
import { GetCurrentUserController } from './controllers/get-current-user.controller';
import { NotificationModule } from 'src/notifications/notification.module';
import { NotificationsController } from './controllers/notifications.controller';
import { LoginWithMagicLinkController } from './controllers/login-with-magic-link.controller';
import { LoginWithOtpController } from './controllers/login-with-otp.controller';
import { LoginWithMagicLinkUseCase } from 'src/use-cases/login-with-magic-link.use-case';
import { LoginWithOtpUseCase } from 'src/use-cases/login-with-otp.use-case';
import { SendMagicLinkEmailUseCase } from 'src/use-cases/send-magic-link-mail.use-case';
import { GetUserByIdUseCase } from 'src/use-cases/get-user-by-id.use-case';
import { LogoutController } from './controllers/logout.controller';

@Module({
  imports: [DatabaseModule, AuthModule, CryptographyModule, NotificationModule],
  controllers: [
    LoginWithEmailController,
    LoginWithMagicLinkController,
    LoginWithOtpController,
    LogoutController,
    SendMagicLinkEmailController,
    RegisterAccountController,
    ChangePasswordController,
    GetCurrentUserController,
    NotificationsController,
  ],
  providers: [
    LoginWithEmailUseCase,
    LoginWithMagicLinkUseCase,
    LoginWithOtpUseCase,
    RegisterAccountUseCase,
    ChangePasswordUseCase,
    GetUserByIdUseCase,
    SendMagicLinkEmailUseCase,
  ],
})
export class HttpModule {}
