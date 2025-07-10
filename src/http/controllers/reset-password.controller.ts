import {
  Body,
  Controller,
  Patch,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ResetPasswordUseCase } from 'src/use-cases/reset-password.use-case';
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
export class ResetPasswordController {
  constructor(private resetPasswordUseCase: ResetPasswordUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Patch('/users/reset-password')
  async handle(
    @Body(bodyValidationPipe) body: BodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { sub } = user;
    const { newPassword } = body;

    const result = await this.resetPasswordUseCase.execute({
      userId: sub,
      newPassword,
    });

    if (result.isLeft()) {
      throw new UnauthorizedException(result.value.message);
    }
  }
}
