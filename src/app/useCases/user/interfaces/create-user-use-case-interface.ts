import { User } from '../../../../domain/user/user';

export interface CreateUserUseCaseInterface {
  create(
    user: User,
  ): Promise<{ value: any; isError(): boolean; isSuccess(): boolean }>;
}
