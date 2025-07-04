import {
  Body,
  Controller,
  Patch,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ChangePasswordUseCase } from 'src/use-cases/change-password.use-case';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { CurrentUser } from 'src/security/auth/current-user.decorator';
import { UserPayload } from 'src/security/auth/jwt.strategy';
import { JwtAuthGuard } from 'src/security/auth/jwt-auth.guard';

const bodySchema = z.object({
  newPassword: z.string().min(8),
});

type BodySchema = z.infer<typeof bodySchema>;

const bodyValidationPipe = new ZodValidationPipe(bodySchema);

@Controller()
export class ChangePasswordController {
  constructor(private changePasswordUseCase: ChangePasswordUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Patch('/change-password')
  async handle(
    @Body(bodyValidationPipe) body: BodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { sub } = user;
    const { newPassword } = body;

    const result = await this.changePasswordUseCase.execute({
      userId: sub,
      newPassword,
    });

    if (result.isLeft()) {
      return new UnauthorizedException(result.value.message);
    }
  }
}
