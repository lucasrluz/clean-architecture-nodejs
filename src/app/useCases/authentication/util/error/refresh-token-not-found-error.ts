export class RefreshTokenNotFoundError extends Error {
  public readonly name = 'RefreshTokenNotFoundError';

  constructor() {
    super('Refresh token not found');
  }
}
