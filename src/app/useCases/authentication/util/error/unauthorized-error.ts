export class UnauthorizedError extends Error {
  public readonly name = 'UnauthorizedError';

  constructor() {
    super('Email or password incorrect');
  }
}
