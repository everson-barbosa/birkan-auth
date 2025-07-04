import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OtpCodesRepository } from 'src/database/repositories/otp-codes.repository';
import { OtpCode } from 'src/entities/otp-code.entity';
import { PrismaOtpCodeMapper } from '../mappers/prisma-otp-code.mapper';

@Injectable()
export class PrismaOtpCodesRepository implements OtpCodesRepository {
  constructor(private prismaService: PrismaService) {}

  async create(otpCode: OtpCode): Promise<void> {
    const data = PrismaOtpCodeMapper.toPrisma(otpCode);

    await this.prismaService.otpCode.create({ data });
  }

  async save(otpCode: OtpCode): Promise<void> {
    const data = PrismaOtpCodeMapper.toPrisma(otpCode);

    await this.prismaService.otpCode.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  async findValidByCodeNumber(codeNumber: number): Promise<OtpCode | null> {
    const otpCode = await this.prismaService.otpCode.findFirst({
      where: {
        codeNumber,
        consumedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!otpCode) return null;

    return PrismaOtpCodeMapper.toDomain(otpCode);
  }
}
