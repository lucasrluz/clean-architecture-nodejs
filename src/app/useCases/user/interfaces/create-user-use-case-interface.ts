import { UserData } from '../../../../shared/type/user-data';

export interface CreateUserUseCaseInterface {
  create(
    user: UserData,
  ): Promise<{ value: any; isError(): boolean; isSuccess(): boolean }>;
}
