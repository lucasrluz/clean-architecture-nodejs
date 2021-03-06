import { PrismaClient } from '@prisma/client';
import { AuthenticateUseCase } from '../../../../../app/useCases/authentication/authenticate-use-case';
import { Bcrypt } from '../../../../bcrypt/bcrypt';
import { Jwt } from '../../../../jwt/jwt';
import { PrismaRefreshTokenRepository } from '../../../../prisma/repositories/prisma-refresh-token-repository';
import { PrismaUserRepository } from '../../../../prisma/repositories/prisma-user-repository';
import { AuthenticateController } from '../../authenticate-controller';

export const makeAuthenticateController = () => {
  const prisma = new PrismaClient();
  const userRepository = new PrismaUserRepository(prisma);
  const refreshTokenRepository = new PrismaRefreshTokenRepository(prisma);
  const encoder = new Bcrypt();
  const jwt = new Jwt();
  const authenticateUseCase = new AuthenticateUseCase(
    userRepository,
    refreshTokenRepository,
    encoder,
    jwt,
  );
  const authenticateController = new AuthenticateController(
    authenticateUseCase,
  );
  return authenticateController;
};
