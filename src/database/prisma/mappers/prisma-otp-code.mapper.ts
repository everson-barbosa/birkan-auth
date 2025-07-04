import { OtpCode as PrismaOtpCode } from '@prisma/client';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { OtpCode } from 'src/entities/otp-code.entity';

export class PrismaOtpCodeMapper {
  static toDomain(raw: PrismaOtpCode): OtpCode {
    return OtpCode.create(
      {
        codeNumber: raw.codeNumber,
        expiresAt: raw.expiresAt,
        consumedAt: raw.consumedAt,
        userId: new UniqueEntityID(raw.userId),
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(raw: OtpCode): PrismaOtpCode {
    return {
      id: raw.id.toString(),
      codeNumber: raw.codeNumber,
      expiresAt: raw.expiresAt,
      consumedAt: raw.consumedAt,
      userId: raw.userId.toString(),
    };
  }
}
