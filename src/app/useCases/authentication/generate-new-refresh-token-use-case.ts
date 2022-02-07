import dayjs from 'dayjs';
import { JwtInterface } from '../../../infra/jwt/interface/jwt-interface';
import { RefreshTokenRepositoryInterface } from '../../../infra/prisma/repositories/interfaces/refresh-token-repository-interface';
import { error, success } from '../../../shared/response/response';
import { GenerateNewRefreshTokenUseCaseInterface } from './interface/generate-new-refresh-token-use-case-interface';
import { RefreshTokenNotFoundError } from './util/error/refresh-token-not-found-error';

export class GenerateNewRefreshTokenUseCase
  implements GenerateNewRefreshTokenUseCaseInterface
{
  private readonly refreshTokenRepository: RefreshTokenRepositoryInterface;
  private readonly jwt: JwtInterface;

  constructor(
    refreshTokenRepository: RefreshTokenRepositoryInterface,
    jwt: JwtInterface,
  ) {
    this.refreshTokenRepository = refreshTokenRepository;
    this.jwt = jwt;
  }

  async create(refreshTokenId: string) {
    const refreshTokenOrEmpty = await this.refreshTokenRepository.findById(
      refreshTokenId,
    );

    if (!refreshTokenOrEmpty) {
      return error(new RefreshTokenNotFoundError().message);
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshTokenOrEmpty.expiresIn),
    );

    const token = this.jwt.generate(refreshTokenOrEmpty.userId);

    if (!refreshTokenExpired) {
      return success({ token: token, refreshToken: refreshTokenId });
    }

    await this.refreshTokenRepository.deleteById(refreshTokenId);

    const expiresIn = dayjs().add(15, 'seconds').unix();

    const newRefreshToken = await this.refreshTokenRepository.create({
      expiresIn: expiresIn,
      userId: refreshTokenOrEmpty.userId,
    });

    return success({
      token: token,
      refreshToken: newRefreshToken.refreshToken,
    });
  }
}
