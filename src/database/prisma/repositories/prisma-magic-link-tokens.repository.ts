import { Injectable } from '@nestjs/common';
import { MagicLinkTokensRepository } from 'src/database/repositories/magic-link-tokens.repository';
import { MagicLinkToken } from 'src/entities/magic-link-token.entity';
import { PrismaService } from '../prisma.service';
import { PrismaMagicLinkTokenMapper } from '../mappers/prisma-magic-link.mapper';

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
