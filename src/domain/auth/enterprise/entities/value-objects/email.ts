export class Email {
  private value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(email: string): Email {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email format');
    }

    return new Email(email.toLowerCase());
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: Email): boolean {
    return this.value === other.value;
  }
}
