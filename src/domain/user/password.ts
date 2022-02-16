import { error, success } from '../../shared/response/response';
import { InvalidPasswordError } from './util/errors/invalid-password-error';
import { validatePassword } from './util/validations/password-validate';

export class Password {
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string) {
    if (!validatePassword(value)) return error(new InvalidPasswordError());

    return success(new Password(value));
  }
}
