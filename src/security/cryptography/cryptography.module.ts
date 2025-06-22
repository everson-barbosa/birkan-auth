import { Module } from '@nestjs/common';
import { HashComparer } from './hash-comparer';
import { BcryptHasher } from './bcrypt/bcrypt-hasher';
import { HashGenerator } from './hash-generator';
import { Encrypter } from './encrypter';
import { JwtEncrypter } from './jwt/jwt-encrypter';
import { JwtConfigModule } from 'src/security/jwt/jwt-config.module';

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
