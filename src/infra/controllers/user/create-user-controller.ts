import { CreateUserUseCaseInterface } from '../../../app/useCases/user/interfaces/create-user-use-case-interface';
import { User } from '../../../domain/user';
import { badRequest, created } from '../util/response/responses';

export class CreateUserController {
  private readonly createUserUseCase: CreateUserUseCaseInterface;

  constructor(createUserUseCase: CreateUserUseCaseInterface) {
    this.createUserUseCase = createUserUseCase;
  }

  async perform(user: User) {
    const response = await this.createUserUseCase.create(user);

    if (response.isError()) return badRequest(response.value);

    return created(response.value);
  }
}
