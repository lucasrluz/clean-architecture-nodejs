export class InvalidUsernameError extends Error {
  public readonly name: string;

  constructor() {
    super('Invalid username');
    this.name = 'InvalidUsernameError';
  }
}
