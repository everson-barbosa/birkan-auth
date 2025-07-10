import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { LoginWithEmailUseCase } from '../../use-cases/login-with-email.use-case';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { WrongCredentialsError } from 'src/use-cases/errors/wrong-credentails.error';
import { Response } from 'express';
import { setAccessTokenCookie } from 'src/security/auth/helpers/access-token-cookie.helper';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type BodySchema = z.infer<typeof bodySchema>;

@Controller()
export class LoginWithEmailController {
  constructor(private loginWithEmailUseCase: LoginWithEmailUseCase) {}

  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(bodySchema))
  @Post('/login/email')
  async handle(
    @Body() body: BodySchema,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password } = body;

    const result = await this.loginWithEmailUseCase.execute({
      email,
      password,
    });

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
