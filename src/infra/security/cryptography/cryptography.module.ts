import { Module } from '@nestjs/common';
import { Encrypter } from 'src/domain/auth/application/cryptography/encrypter';
import { HashComparer } from 'src/domain/auth/application/cryptography/hash-comparer';
import { HashGenerator } from 'src/domain/auth/application/cryptography/hash-generator';
import { JwtConfigModule } from '../jwt/jwt-config.module';
import { BcryptHasher } from './bcrypt/bcrypt-hasher';
import { JwtEncrypter } from './jwt/jwt-encrypter';

@Module({
  imports: [JwtConfigModule],
  providers: [
    {
      provide: HashComparer,
      useClass: BcryptHasher,
    },
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
  ],
  exports: [HashComparer, HashGenerator, Encrypter],
})
export class CryptographyModule {}
