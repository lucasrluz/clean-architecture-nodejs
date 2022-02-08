export class InvalidEmailError extends Error {
  public readonly name: string;

  constructor() {
    super('Invalid email');
    this.name = 'InvalidEmailError';
  }
}
