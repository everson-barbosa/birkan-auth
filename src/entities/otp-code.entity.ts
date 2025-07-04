import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Optional } from 'src/core/types/Optional';

interface OtpCodeProps {
  codeNumber: number;
  expiresAt: Date;
  consumedAt: Date | null;
  userId: UniqueEntityID;
}

export class OtpCode extends Entity<OtpCodeProps> {
  get codeNumber() {
    return this.props.codeNumber;
  }

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
    props: Optional<OtpCodeProps, 'consumedAt'>,
    id?: UniqueEntityID,
  ) {
    const otpCode = new OtpCode(
      {
        ...props,
        consumedAt: props?.consumedAt ?? null,
      },
      id,
    );

    return otpCode;
  }
}
