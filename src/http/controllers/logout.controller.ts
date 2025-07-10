import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { removeAccessTokenCookieProps } from 'src/security/auth/helpers/access-token-cookie.helper';

@Controller()
export class LogoutController {
  @Post('/logout')
  async handle(@Res({ passthrough: true }) res: Response) {
    removeAccessTokenCookieProps({ res });
  }
}
