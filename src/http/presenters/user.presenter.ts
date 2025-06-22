import { User } from 'src/entities/user.entity';

export class UserPresenter {
  static toHttp(raw: User) {
    return {
      id: raw.id.toString(),
      name: raw.name,
      email: raw.email,
    };
  }
}
