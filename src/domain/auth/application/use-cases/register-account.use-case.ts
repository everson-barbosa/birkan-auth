import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { HashGenerator } from 'src/domain/auth/application/cryptography/hash-generator';
import { EmailAlreadyRegisteredError } from './errors/email-already-registered.error';
import { User, UserStatus } from '../../enterprise/entities/user.aggreate-root';
import { UsersRepository } from '../repositories/users.repository';
import { DomainEvents } from 'src/core/events/domain-events';

interface RegisterAccountUseCaseRequest {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

type RegisterAccountUseCaseResponse = Either<
  EmailAlreadyRegisteredError,
  {
    readonly user: User;
  }
>;

@Injectable()
export class RegisterAccountUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    email,
    name,
    password,
  }: RegisterAccountUseCaseRequest): Promise<RegisterAccountUseCaseResponse> {
    const userOnDatabase = await this.usersRepository.findByEmail(email);

    if (userOnDatabase) {
      return left(new EmailAlreadyRegisteredError());
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const user = User.create({
      email,
      name,
      password: hashedPassword,
      status: UserStatus.ACTIVE,
    });

    await this.usersRepository.create(user);

    DomainEvents.dispatchEventsForAggregate(user.id);

    return right({
      user,
    });
  }
}
