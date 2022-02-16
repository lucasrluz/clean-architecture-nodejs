import { PrismaClient } from '@prisma/client';
import { UserData } from '../../../shared/type/user-data';
import { UserRepositoryInterface } from './interfaces/user-repository-interface';

export class PrismaUserRepository implements UserRepositoryInterface {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async create(user: UserData) {
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

  public async findByUsernameAndEmail(username: string, email: string) {
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

  public async findByEmail(email: string) {
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
