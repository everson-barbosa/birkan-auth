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
import { WrongCredentialsError } from 'src/use-cases/errors/wrong-credentails.error';
import { setAccessTokenCookie } from 'src/security/auth/helpers/access-token-cookie.helper';
import { Response } from 'express';
import { LoginWithMagicLinkUseCase } from 'src/use-cases/login-with-magic-link.use-case';

const bodySchema = z.object({
  token: z.string().uuid(),
});

type BodySchema = z.infer<typeof bodySchema>;

@Controller()
export class LoginWithMagicLinkController {
  constructor(private loginWithMagicLinkUseCase: LoginWithMagicLinkUseCase) {}

  @UsePipes(new ZodValidationPipe(bodySchema))
  @Post('login/magic-link/verify')
  async handle(
    @Body() body: BodySchema,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token } = body;

    const result = await this.loginWithMagicLinkUseCase.execute({ id: token });

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
