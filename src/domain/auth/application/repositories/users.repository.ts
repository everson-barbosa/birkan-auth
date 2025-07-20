import { Injectable } from '@nestjs/common';
import { User } from '../../enterprise/entities/user.aggreate-root';

@Injectable()
export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;
  abstract save(user: User): Promise<void>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
}
