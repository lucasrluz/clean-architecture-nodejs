export interface EncoderInterface {
  encode(password: string): Promise<string>;
  compare(password: string, passwordHash: string): Promise<boolean>;
}
