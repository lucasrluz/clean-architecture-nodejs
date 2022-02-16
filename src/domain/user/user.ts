import { InvalidEmailError } from './util/errors/invalid-email-error';
import { InvalidUsernameError } from './util/errors/invalid-username-error';
import { error, success } from '../../shared/response/response';
import { validateEmail } from './util/validations/email-validate';
import { validateUsername } from './util/validations/username-validate';
import { Password } from './password';

export class User {
  public username: string;
  public email: string;
  public password: Password;

  private constructor(username: string, email: string, password: Password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  public static create(username: string, email: string, password: string) {
    if (!validateUsername(username)) return error(new InvalidUsernameError());

    if (!validateEmail(email)) return error(new InvalidEmailError());

    const passwordValidation = Password.create(password);

    if (passwordValidation.isError()) return error(passwordValidation.value);

    return success(new User(username, email, passwordValidation.value));
  }
}
