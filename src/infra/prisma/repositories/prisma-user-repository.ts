import { PrismaClient } from '@prisma/client';
import { User } from '../../../domain/user/user';
import { UserRepositoryInterface } from './interfaces/user-repository-interface';

export class PrismaUserRepository implements UserRepositoryInterface {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(user: User): Promise<{ username: string; email: string }> {
    const response = await this.prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });

    return {
      username: response.username,
      email: response.email,
    };
  }

  async findByUsernameAndEmail(
    username: string,
    email: string,
  ): Promise<{ username: string | undefined; email: string | undefined }> {
    const response = await this.prisma.user.findFirst({
      where: {
        username: username,
        email: email,
      },
    });

    return {
      username: response?.username,
      email: response?.email,
    };
  }

  async findByEmail(email: string): Promise<{
    id: string | undefined;
    email: string | undefined;
    password: string | undefined;
  }> {
    const response = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return {
      id: response?.id,
      email: response?.email,
      password: response?.password,
    };
  }
}
