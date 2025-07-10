import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';
import { PrismaService } from './prisma/prisma.service';
import { MagicLinkTokensRepository } from './repositories/magic-link-tokens.repository';
import { PrismaMagicLinkTokensRepository } from './prisma/repositories/prisma-magic-link-tokens.repository';

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
