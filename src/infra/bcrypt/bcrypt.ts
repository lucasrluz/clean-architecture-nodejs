import { hash } from 'bcrypt';
import { EncoderInterface } from './interface/encoder-interface';

export class Bcrypt implements EncoderInterface {
  private readonly rounds = 10;

  async encode(password: string) {
    return await hash(password, this.rounds);
  }
}
