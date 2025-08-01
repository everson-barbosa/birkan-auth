import { $Enums, User as PrismaUser } from '@prisma/client';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import {
  User,
  UserStatus,
} from 'src/domain/auth/enterprise/entities/user.aggreate-root';
import { Email } from 'src/domain/auth/enterprise/entities/value-objects/email';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        email: Email.create(raw.email),
        name: raw.name,
        password: raw.password,
        status: UserStatus[raw.status],
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(raw: User): PrismaUser {
    return {
      id: raw.id.toString(),
      email: raw.email.getValue(),
      name: raw.name,
      password: raw.password,
      status: $Enums.UserStatus[raw.status],
    };
  }
}
