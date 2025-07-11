import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { SendMagicLinkViaEmailUseCase } from 'src/domain/auth/application/use-cases/send-magic-link-via-mail.use-case';
import { EnvService } from 'src/infra/env/env.service';

const bodySchema = z.object({
  email: z.string().email(),
});

type BodySchema = z.infer<typeof bodySchema>;

const bodyValidationPipe = new ZodValidationPipe(bodySchema);

@Controller()
export class SendMagicLinkViaEmailController {
  constructor(
    private sendMagicLinkViaEmailUseCase: SendMagicLinkViaEmailUseCase,
    private envService: EnvService,
  ) {}

  @HttpCode(200)
  @Post('/login/magic-link/email')
  async handle(@Body(bodyValidationPipe) body: BodySchema) {
    const { email } = body;

    const frontEndMagicLink = this.envService.get('FRONT_END_MAGIC_LINK');

    await this.sendMagicLinkViaEmailUseCase.execute({
      email,
      frontEndMagicLink,
    });

    return { message: 'Ok' };
  }
}
