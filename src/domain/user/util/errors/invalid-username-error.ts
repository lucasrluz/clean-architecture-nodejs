export class InvalidUsernameError extends Error {
  public readonly name = 'InvalidUsernameError';

  constructor() {
    super('Invalid username');
  }
}
