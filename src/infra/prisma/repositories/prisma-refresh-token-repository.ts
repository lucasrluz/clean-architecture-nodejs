import { PrismaClient } from '@prisma/client';
import { RefreshToken } from '../../../domain/refreshToken/refresh-token';
import { RefreshTokenRepositoryInterface } from './interfaces/refresh-token-repository-interface';

export class PrismaRefreshTokenRepository
  implements RefreshTokenRepositoryInterface
{
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(refreshToken: RefreshToken) {
    const response = await this.prisma.refreshToken.create({
      data: {
        userId: refreshToken.userId,
        expiresIn: refreshToken.expiresIn,
      },
    });

    return {
      refreshToken: response.id,
    };
  }

  async findById(refreshTokenId: string) {
    const response = await this.prisma.refreshToken.findFirst({
      where: {
        id: refreshTokenId,
      },
    });

    return response;
  }

  async deleteById(refreshTokenId: string) {
    await this.prisma.refreshToken.delete({
      where: {
        id: refreshTokenId,
      },
    });
  }

  async deleteByUserId(userId: string) {
    await this.prisma.refreshToken.deleteMany({
      where: {
        userId: userId,
      },
    });
  }
}
