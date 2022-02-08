export class ExistingUserError extends Error {
  public readonly name: string;

  constructor() {
    super('User already registered');
    this.name = 'ExistingUserError';
  }
}
