export class InvalidPasswordError extends Error {
  public readonly name: string;

  constructor() {
    super('Invalid password');
    this.name = 'InvalidPasswordError';
  }
}
