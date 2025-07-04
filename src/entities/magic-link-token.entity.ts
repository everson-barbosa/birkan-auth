import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Optional } from 'src/core/types/Optional';

interface MagicLinkTokenProps {
  expiresAt: Date;
  consumedAt: Date | null;
  userId: UniqueEntityID;
}

export class MagicLinkToken extends Entity<MagicLinkTokenProps> {
  get expiresAt() {
    return this.props.expiresAt;
  }

  get consumedAt() {
    return this.props.consumedAt;
  }

  get userId() {
    return this.props.userId;
  }

  isExpired() {
    return this.props.expiresAt < new Date();
  }

  isConsumed() {
    return !!this.props.consumedAt;
  }

  markAsConsumed() {
    this.props.consumedAt = new Date();
  }

  static create(
    props: Optional<MagicLinkTokenProps, 'consumedAt'>,
    id?: UniqueEntityID,
  ) {
    const magicLinkToken = new MagicLinkToken(
      {
        ...props,
        consumedAt: props?.consumedAt ?? null,
      },
      id,
    );

    return magicLinkToken;
  }
}
