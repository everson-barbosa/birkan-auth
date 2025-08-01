import { compare, hash } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { HashComparer } from 'src/domain/auth/application/cryptography/hash-comparer';
import { HashGenerator } from 'src/domain/auth/application/cryptography/hash-generator';

@Injectable()
export class BcryptHasher implements HashComparer, HashGenerator {
  private HASH_SALT_LENGTH = 8;

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }
}
