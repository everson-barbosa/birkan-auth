import { UseCaseError } from 'src/core/errors/use-case-error';

export class InvalidAuthCode extends Error implements UseCaseError {
  constructor() {
    super('Invalid auth code');
  }
}
