export interface EncoderInterface {
  encode(password: string): Promise<string>;
}
