import { Module } from '@nestjs/common';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaMagicLinkTokensRepository } from './prisma/repositories/prisma-magic-link-tokens.repository';
import { MagicLinkTokensRepository } from 'src/domain/auth/application/repositories/magic-link-tokens.repository';
import { UsersRepository } from 'src/domain/auth/application/repositories/users.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: MagicLinkTokensRepository,
      useClass: PrismaMagicLinkTokensRepository,
    },
  ],
  exports: [UsersRepository, MagicLinkTokensRepository, PrismaService],
})
export class DatabaseModule {}
