import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { Public } from 'src/security/auth/public';
import { SendMagicLinkEmailUseCase } from 'src/use-cases/send-magic-link-mail.use-case';

const bodySchema = z.object({
  email: z.string().email(),
});

type BodySchema = z.infer<typeof bodySchema>;

const bodyValidationPipe = new ZodValidationPipe(bodySchema);

@Public()
@Controller()
export class SendMagicLinkEmailController {
  constructor(private sendMagicLinkEmailUseCase: SendMagicLinkEmailUseCase) {}

  @HttpCode(200)
  @Post('/login/magic-link')
  async handle(@Body(bodyValidationPipe) body: BodySchema) {
    const { email } = body;

    await this.sendMagicLinkEmailUseCase.execute({ email });

    return { message: 'Ok' };
  }
}
