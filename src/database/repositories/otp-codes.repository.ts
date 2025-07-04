import { Injectable } from '@nestjs/common';
import { OtpCode } from 'src/entities/otp-code.entity';

@Injectable()
export abstract class OtpCodesRepository {
  abstract create(otpCode: OtpCode): Promise<void>;
  abstract save(otpCode: OtpCode): Promise<void>;
  abstract findValidByCodeNumber(codeNumber: number): Promise<OtpCode | null>;
}
