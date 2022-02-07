import { PrismaClient } from '@prisma/client';
import { GenerateNewRefreshTokenUseCase } from '../../../../../app/useCases/authentication/generate-new-refresh-token-use-case';
import { Jwt } from '../../../../jwt/jwt';
import { PrismaRefreshTokenRepository } from '../../../../prisma/repositories/prisma-refresh-token-repository';
import { GenerateNewRefreshTokenController } from '../../generate-new-refresh-token-controller';

export const makeGenerateNewRefreshTokenController = () => {
  const prisma = new PrismaClient();
  const refreshTokenRepository = new PrismaRefreshTokenRepository(prisma);
  const jwt = new Jwt();
  const generateRefreshTokenUseCase = new GenerateNewRefreshTokenUseCase(
    refreshTokenRepository,
    jwt,
  );
  const generateRefreshTokenController = new GenerateNewRefreshTokenController(
    generateRefreshTokenUseCase,
  );

  return generateRefreshTokenController;
};
