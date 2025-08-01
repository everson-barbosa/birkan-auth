import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { UserPresenter } from '../presenters/user.presenter';
import { EmailAlreadyRegisteredError } from 'src/domain/auth/application/use-cases/errors/email-already-registered.error';
import { RegisterAccountUseCase } from 'src/domain/auth/application/use-cases/register-account.use-case';

const bodySchema = z.object({
  name: z.string().min(8),
  email: z.string().email(),
  password: z.string().min(8),
});

type BodySchema = z.infer<typeof bodySchema>;

const bodyValidationPipe = new ZodValidationPipe(bodySchema);

@Controller()
export class RegisterAccountController {
  constructor(private registerAccountUseCase: RegisterAccountUseCase) {}

  @HttpCode(201)
  @Post('/users')
  async handle(@Body(bodyValidationPipe) body: BodySchema) {
    const result = await this.registerAccountUseCase.execute(body);

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case EmailAlreadyRegisteredError:
          throw new ConflictException();
        default:
          throw new BadRequestException();
      }
    }

    return UserPresenter.toHttp(result.value.user);
  }
}
