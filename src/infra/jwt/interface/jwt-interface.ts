export interface JwtInterface {
  generate(userId: string): string;
}
