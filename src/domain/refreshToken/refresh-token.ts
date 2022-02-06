export class RefreshToken {
  userId: string;
  expiresIn: number;

  constructor(userId: string, expiresIn: number) {
    this.userId = userId;
    this.expiresIn = expiresIn;
  }
}
