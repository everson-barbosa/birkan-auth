import { Either, left, right } from 'src/core/either';
import { UserNotFoundError } from './errors/user-not-found.error';
import { HashGenerator } from 'src/domain/auth/application/cryptography/hash-generator';
import { Injectable } from '@nestjs/common';
import { NotAllowedError } from './errors/not-allowed.error';
import { UserStatus } from '../../enterprise/entities/user.aggreate-root';
import { UsersRepository } from '../repositories/users.repository';

interface ResetPasswordUseCaseRequest {
  readonly newPassword: string;
  readonly userId: string;
}

type ResetPasswordUseCaseResponse = Either<
  UserNotFoundError | NotAllowedError,
  null
>;

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    userId,
    newPassword,
  }: ResetPasswordUseCaseRequest): Promise<ResetPasswordUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new UserNotFoundError());
    }

    const isRequireChangePassword =
      user.status === UserStatus.REQUIRE_CHANGE_PASSWORD;

    if (!isRequireChangePassword) {
      return left(new NotAllowedError());
    }

    const hashedPassword = await this.hashGenerator.hash(newPassword);

    user.password = hashedPassword;
    user.status = UserStatus.ACTIVE;

    await this.usersRepository.save(user);

    return right(null);
  }
}
