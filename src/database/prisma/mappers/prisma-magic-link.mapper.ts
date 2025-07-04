import { MagicLinkToken as PrismaMagicLinkToken } from '@prisma/client';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { MagicLinkToken } from 'src/entities/magic-link-token.entity';

export class PrismaMagicLinkTokenMapper {
  static toDomain(raw: PrismaMagicLinkToken): MagicLinkToken {
    return MagicLinkToken.create(
      {
        expiresAt: raw.expiresAt,
        consumedAt: raw.consumedAt,
        userId: new UniqueEntityID(raw.userId),
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(raw: MagicLinkToken): PrismaMagicLinkToken {
    return {
      id: raw.id.toString(),
      expiresAt: raw.expiresAt,
      consumedAt: raw.consumedAt,
      userId: raw.userId.toString(),
    };
  }
}
