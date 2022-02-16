import { CreateUserUseCaseInterface } from '../../../app/useCases/user/interfaces/create-user-use-case-interface';
import { badRequest, created } from '../util/response/responses';
import { UserData } from '../../../shared/type/user-data';

export class CreateUserController {
  private readonly createUserUseCase: CreateUserUseCaseInterface;

  constructor(createUserUseCase: CreateUserUseCaseInterface) {
    this.createUserUseCase = createUserUseCase;
  }

  public async perform(user: UserData) {
    const response = await this.createUserUseCase.create(user);

    if (response.isError()) return badRequest(response.value);

    return created(response.value);
  }
}
