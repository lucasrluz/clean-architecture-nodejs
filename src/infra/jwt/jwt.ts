import { sign } from 'jsonwebtoken';
import { JwtInterface } from './interface/jwt-interface';

export class Jwt implements JwtInterface {
  generate(userId: string) {
    return sign({}, process.env.SECRET_OR_PRIVATE_KEY as string, {
      subject: userId,
      expiresIn: '20s',
    });
  }
}
