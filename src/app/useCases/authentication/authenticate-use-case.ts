import dayjs from 'dayjs';
import { EncoderInterface } from '../../../infra/bcrypt/interface/encoder-interface';
import { JwtInterface } from '../../../infra/jwt/interface/jwt-interface';
import { RefreshTokenRepositoryInterface } from '../../../infra/prisma/repositories/interfaces/refresh-token-repository-interface';
import { UserRepositoryInterface } from '../../../infra/prisma/repositories/interfaces/user-repository-interface';
import { error, success } from '../../../shared/response/response';
import { AuthenticateUseCaseInterface } from './interface/authenticate-use-case-interface';
import { UnauthorizedError } from './util/error/unauthorized-error';

export class AuthenticateUseCase implements AuthenticateUseCaseInterface {
  private readonly userRepository: UserRepositoryInterface;
  private readonly refreshTokenRepository: RefreshTokenRepositoryInterface;
  private readonly encoder: EncoderInterface;
  private readonly jwt: JwtInterface;

  constructor(
    userRepository: UserRepositoryInterface,
    refreshTokenRepository: RefreshTokenRepositoryInterface,
    encoder: EncoderInterface,
    jwt: JwtInterface,
  ) {
    this.userRepository = userRepository;
    this.refreshTokenRepository = refreshTokenRepository;
    this.encoder = encoder;
    this.jwt = jwt;
  }

  async authenticate(email: string, password: string) {
    const userOrEmpty = await this.userRepository.findByEmail(email);

    if (!userOrEmpty.email || !userOrEmpty.password || !userOrEmpty.id)
      return error(new UnauthorizedError().message);

    const passwordComparation = await this.encoder.compare(
      password,
      userOrEmpty.password,
    );

    if (!passwordComparation) return error(new UnauthorizedError().message);

    const token = this.jwt.generate(userOrEmpty.id);

    await this.refreshTokenRepository.deleteByUserId(userOrEmpty.id);

    const expiresIn = dayjs().add(15, 'seconds').unix();

    const refreshToken = await this.refreshTokenRepository.create({
      userId: userOrEmpty.id,
      expiresIn: expiresIn,
    });

    return success({
      token: token,
      refreshToken: refreshToken.refreshToken,
    });
  }
}
