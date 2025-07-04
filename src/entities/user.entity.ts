import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  REQUIRE_CHANGE_PASSWORD = 'REQUIRE_CHANGE_PASSWORD',
}

interface UserProps {
  email: string;
  name: string;
  password: string;
  status: UserStatus;
}

export class User extends Entity<UserProps> {
  get email() {
    return this.props.email;
  }

  get name() {
    return this.props.name;
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get status() {
    return this.props.status;
  }

  set status(status: UserStatus) {
    this.props.status = status;
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
      },
      id,
    );

    return user;
  }
}
