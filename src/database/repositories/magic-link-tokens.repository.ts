import { Injectable } from '@nestjs/common';
import { MagicLinkToken } from 'src/entities/magic-link-token.entity';

@Injectable()
export abstract class MagicLinkTokensRepository {
  abstract create(magicLinkToken: MagicLinkToken): Promise<void>;
  abstract save(magicLinkToken: MagicLinkToken): Promise<void>;
  abstract findById(id: string): Promise<MagicLinkToken | null>;
}
