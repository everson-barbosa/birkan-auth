import { User } from 'src/domain/auth/enterprise/entities/user.aggreate-root';

export class UserPresenter {
  static toHttp(raw: User) {
    return {
      id: raw.id.toString(),
      name: raw.name,
      email: raw.email.getValue(),
      status: raw.status,
    };
  }
}
