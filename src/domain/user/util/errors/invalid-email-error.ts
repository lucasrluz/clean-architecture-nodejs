export class InvalidEmailError extends Error {
  public readonly name = 'InvalidEmailError';

  constructor() {
    super('Invalid email');
  }
}
