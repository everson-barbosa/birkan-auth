import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { SendMagicLinkViaEmailUseCase } from 'src/use-cases/send-magic-link-via-mail.use-case';

const bodySchema = z.object({
  email: z.string().email(),
});

type BodySchema = z.infer<typeof bodySchema>;

const bodyValidationPipe = new ZodValidationPipe(bodySchema);

@Controller()
export class SendMagicLinkViaEmailController {
  constructor(
    private sendMagicLinkViaEmailUseCase: SendMagicLinkViaEmailUseCase,
  ) {}

  @HttpCode(200)
  @Post('/login/magic-link/email')
  async handle(@Body(bodyValidationPipe) body: BodySchema) {
    const { email } = body;

    await this.sendMagicLinkViaEmailUseCase.execute({ email });

    return { message: 'Ok' };
  }
}
