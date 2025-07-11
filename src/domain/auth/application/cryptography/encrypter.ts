export interface EncrypterProps {
  readonly payload: Record<string, unknown>;
  readonly expiresIn?: string | number;
}

export abstract class Encrypter {
  abstract encrypt(props: EncrypterProps): Promise<string>;
}
