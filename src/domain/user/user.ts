import { InvalidEmailError } from './util/errors/invalid-email-error';
import { InvalidPasswordError } from './util/errors/invalid-password-error';
import { InvalidUsernameError } from './util/errors/invalid-username-error';
import { error, success } from '../../shared/response/response';
import { validateEmail } from './util/validations/email-validate';
import { validatePassword } from './util/validations/password-validate';
import { validateUsername } from './util/validations/username-validate';

export class User {
  username: string;
  email: string;
  password: string;

  private constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  public static create(username: string, email: string, password: string) {
    if (!validateUsername(username)) return error(new InvalidUsernameError());

    if (!validateEmail(email)) return error(new InvalidEmailError());

    if (!validatePassword(password)) return error(new InvalidPasswordError());

    return success(new User(username, email, password));
  }
}
