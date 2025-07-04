import {
  BadRequestException,
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/security/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/security/auth/jwt-auth.guard';
import { UserPayload } from 'src/security/auth/jwt.strategy';
import { GetUserByIdUseCase } from 'src/use-cases/get-user-by-id.use-case';
import { UserPresenter } from '../presenters/user.presenter';

@Controller('me')
export class GetCurrentUserController {
  constructor(private getUserByIdUseCase: GetUserByIdUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const id = user.sub;

    const result = await this.getUserByIdUseCase.execute({ id });

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message);
    }

    return UserPresenter.toHttp(result.value.user);
  }
}
