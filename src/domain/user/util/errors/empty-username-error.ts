export class EmptyUsernameError extends Error {
  public readonly name = 'EmptyUsernameError';

  constructor() {
    super('Username should not be empty');
  }
}
