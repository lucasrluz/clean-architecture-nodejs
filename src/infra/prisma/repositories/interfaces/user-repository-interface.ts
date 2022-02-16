import { UserData } from '../../../../shared/type/user-data';

export interface UserRepositoryInterface {
  create(user: UserData): Promise<{ username: string; email: string }>;
  findByUsernameAndEmail(
    username: string,
    email: string,
  ): Promise<{ username: string | undefined; email: string | undefined }>;
  findByEmail(email: string): Promise<{
    id: string | undefined;
    email: string | undefined;
    password: string | undefined;
  }>;
}
