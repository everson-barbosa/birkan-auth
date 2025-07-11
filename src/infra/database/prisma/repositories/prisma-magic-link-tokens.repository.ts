import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaMagicLinkTokenMapper } from '../mappers/prisma-magic-link.mapper';
import { MagicLinkTokensRepository } from 'src/domain/auth/application/repositories/magic-link-tokens.repository';
import { MagicLinkToken } from 'src/domain/auth/enterprise/entities/magic-link-token.entity';

@Injectable()
export class PrismaMagicLinkTokensRepository
  implements MagicLinkTokensRepository
{
  constructor(private prismaService: PrismaService) {}

  async create(magicLinkToken: MagicLinkToken): Promise<void> {
    const data = PrismaMagicLinkTokenMapper.toPrisma(magicLinkToken);

    await this.prismaService.magicLinkToken.create({ data });
  }

  async save(magicLinkToken: MagicLinkToken): Promise<void> {
    const data = PrismaMagicLinkTokenMapper.toPrisma(magicLinkToken);

    await this.prismaService.magicLinkToken.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  async findById(id: string): Promise<MagicLinkToken | null> {
    const magicLinkToken = await this.prismaService.magicLinkToken.findUnique({
      where: {
        id,
      },
    });

    if (!magicLinkToken) return null;

    return PrismaMagicLinkTokenMapper.toDomain(magicLinkToken);
  }
}
