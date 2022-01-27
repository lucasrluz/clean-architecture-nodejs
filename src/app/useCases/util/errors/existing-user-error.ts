export class ExistingUserError extends Error {
  public readonly name = 'ExistingUserError';

  constructor() {
    super('User already registered');
  }
}
