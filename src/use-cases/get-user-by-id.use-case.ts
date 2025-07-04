import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { UsersRepository } from 'src/database/repositories/users.repository';
import { UserNotFoundError } from './errors/user-not-found.error';
import { User } from 'src/entities/user.entity';

interface GetUserByIdUseCaseRequest {
  readonly id: string;
}

type GetUserByIdUseCaseResponse = Either<
  UserNotFoundError,
  {
    user: User;
  }
>;

@Injectable()
export class GetUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: GetUserByIdUseCaseRequest): Promise<GetUserByIdUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) return left(new UserNotFoundError());

    return right({ user });
  }
}
