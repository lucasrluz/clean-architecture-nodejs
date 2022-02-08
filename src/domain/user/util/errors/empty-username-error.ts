export class EmptyUsernameError extends Error {
  public readonly name: string;

  constructor() {
    super('Username should not be empty');
    this.name = 'EmptyUsernameError';
  }
}
