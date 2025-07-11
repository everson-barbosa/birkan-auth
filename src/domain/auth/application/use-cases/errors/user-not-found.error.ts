import { UseCaseError } from 'src/core/errors/use-case-error';

export class UserNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Wrong Credentails Error');
  }
}
