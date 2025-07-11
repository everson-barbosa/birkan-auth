import {
  BadRequestException,
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UserPresenter } from '../presenters/user.presenter';
import { GetUserByIdUseCase } from 'src/domain/auth/application/use-cases/get-user-by-id.use-case';
import { CurrentUser } from 'src/infra/security/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/infra/security/auth/jwt-auth.guard';
import { UserPayload } from 'src/infra/security/auth/jwt.strategy';

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
