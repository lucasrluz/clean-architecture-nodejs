import { User } from '../../../../domain/user';

export interface UserRepositoryInterface {
  create(user: User): Promise<{ username: string; email: string }>;
  findByUsernameAndEmail(
    username: string,
    email: string,
  ): Promise<{ username: string | undefined; email: string | undefined }>;
}