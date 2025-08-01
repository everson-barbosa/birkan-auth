import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user.mapper';
import { User } from 'src/domain/auth/enterprise/entities/user.aggreate-root';
import { UsersRepository } from 'src/domain/auth/application/repositories/users.repository';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.create({
      data,
    });
  }

  async save(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }
}
