export class RefreshToken {
  public userId: string;
  public expiresIn: number;

  constructor(userId: string, expiresIn: number) {
    this.userId = userId;
    this.expiresIn = expiresIn;
  }
}
