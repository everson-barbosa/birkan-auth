import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { Encrypter } from 'src/security/cryptography/encrypter';
import { HashComparer } from 'src/security/cryptography/hash-comparer';
import { UsersRepository } from 'src/database/repositories/users.repository';
import { WrongCredentialsError } from './errors/wrong-credentails.error';

interface AuthenticateWithEmailUseCaseRequest {
  readonly email: string;
  readonly password: string;
}

type AuthenticateWithEmailUseCaseResponse = Either<
  WrongCredentialsError,
  {
    readonly accessToken: string;
  }
>;

const AUTHENTICATE_TOKEN_PURPOSE = 'authenticate'

@Injectable()
export class AuthenticateWithEmailUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashCompare: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateWithEmailUseCaseRequest): Promise<AuthenticateWithEmailUseCaseResponse> {
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
        purpose: AUTHENTICATE_TOKEN_PURPOSE
      },
    });

    return right({ accessToken });
  }
}
