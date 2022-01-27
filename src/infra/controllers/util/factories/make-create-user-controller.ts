import { PrismaClient } from '@prisma/client';
import { CreateUserUseCase } from '../../../../app/useCases/user/create-user-use-case';
import { Bcrypt } from '../../../bcrypt/bcrypt';
import { PrismaUserRepository } from '../../../prisma/repositories/prisma-user-repository';
import { CreateUserController } from '../../create-user-controller';

export const makeCreateUserController = () => {
  const prisma = new PrismaClient();
  const userRepository = new PrismaUserRepository(prisma);
  const encoder = new Bcrypt();
  const createUserUseCase = new CreateUserUseCase(userRepository, encoder);
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
};
