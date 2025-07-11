import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { Encrypter } from 'src/domain/auth/application/cryptography/encrypter';
import { HashComparer } from 'src/domain/auth/application/cryptography/hash-comparer';
import { WrongCredentialsError } from './errors/wrong-credentails.error';
import { UsersRepository } from '../repositories/users.repository';

interface LoginWithEmailUseCaseRequest {
  readonly email: string;
  readonly password: string;
}

type LoginWithEmailUseCaseResponse = Either<
  WrongCredentialsError,
  {
    readonly accessToken: string;
  }
>;

@Injectable()
export class LoginWithEmailUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashCompare: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: LoginWithEmailUseCaseRequest): Promise<LoginWithEmailUseCaseResponse> {
    const userOnDatabase = await this.usersRepository.findByEmail(email);

    if (!userOnDatabase) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashCompare.compare(
      password,
      userOnDatabase.password,
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      payload: {
        sub: userOnDatabase.id.toString(),
      },
    });

    return right({ accessToken });
  }
}
