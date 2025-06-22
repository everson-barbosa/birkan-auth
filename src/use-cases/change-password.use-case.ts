import { Either, left, right } from "src/core/either";
import { UsersRepository } from "src/database/repositories/users.repository";
import { UserNotFoundError } from "./errors/user-not-found.error";
import { HashGenerator } from "src/security/cryptography/hash-generator";
import { Injectable } from "@nestjs/common";

interface ChangePasswordUseCaseRequest {
  readonly newPassword: string
  readonly userId: string
}

type ChangePasswordUseCaseResponse = Either<
  UserNotFoundError,
  null
>

@Injectable()
export class ChangePasswordUseCase {
  constructor (
    private usersRepository: UsersRepository, 
    private hashGenerator: HashGenerator
  ) {}

  async execute({ userId, newPassword }: ChangePasswordUseCaseRequest): Promise<ChangePasswordUseCaseResponse> {
    const userOnDatabase = await this.usersRepository.findById(userId)

    if (!userOnDatabase) {
      return left(new UserNotFoundError())
    }

    const hashedPassword = await this.hashGenerator.hash(newPassword)

    userOnDatabase.password = hashedPassword

    await this.usersRepository.save(userOnDatabase)

    return right(null)
  }
}