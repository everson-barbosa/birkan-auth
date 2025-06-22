import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation.pipe";
import { SendResetPasswordLinkUseCase } from "src/use-cases/send-reset-password-link.use-case";
import { Public } from "src/security/auth/public";

const bodySchema = z.object({
  email: z.string().email(),
});

type BodySchema = z.infer<typeof bodySchema>

const bodyValidationPipe = new ZodValidationPipe(bodySchema);

@Public()
@Controller()
export class ForgotPasswordController {
  constructor (private sendResetPasswordLinkUseCase: SendResetPasswordLinkUseCase) {}

  @HttpCode(200)
  @Post('/forgot-password')
  async handle(@Body(bodyValidationPipe) body: BodySchema) {
    const { email } = body

    await this.sendResetPasswordLinkUseCase.execute({ email })

    return { message: 'Ok' }
  }
}