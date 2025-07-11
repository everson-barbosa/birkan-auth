import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { UserNotFoundError } from './errors/user-not-found.error';
import { User } from '../../enterprise/entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';

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
