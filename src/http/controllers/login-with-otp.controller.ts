import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { LoginWithOtpUseCase } from 'src/use-cases/login-with-otp.use-case';
import { WrongCredentialsError } from 'src/use-cases/errors/wrong-credentails.error';
import { setAccessTokenCookie } from 'src/security/auth/access-token-cookie.helper';
import { Response } from 'express';

const bodySchema = z.object({
  codeNumber: z.coerce.number().int().min(100000).max(999999),
});

type BodySchema = z.infer<typeof bodySchema>;

@Controller()
export class LoginWithOtpController {
  constructor(private loginWithOtpUseCase: LoginWithOtpUseCase) {}

  @UsePipes(new ZodValidationPipe(bodySchema))
  @Post('login/otp/verify')
  async handle(
    @Body() body: BodySchema,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { codeNumber } = body;

    const result = await this.loginWithOtpUseCase.execute({ codeNumber });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    setAccessTokenCookie({ res, accessToken: result.value.accessToken });

    return { message: 'Login successfull' };
  }
}
