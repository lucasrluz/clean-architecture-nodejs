import { AuthenticateUseCaseInterface } from '../../../app/useCases/authentication/interface/authenticate-use-case-interface';
import { ControllerInterface } from '../interfaces/controller';
import { badRequest, ok } from '../util/response/responses';

export class AuthenticateController implements ControllerInterface {
  private readonly authenticateUseCase: AuthenticateUseCaseInterface;

  constructor(authenticateUseCase: AuthenticateUseCaseInterface) {
    this.authenticateUseCase = authenticateUseCase;
  }

  async perform(authenticationData: { email: string; password: string }) {
    const response = await this.authenticateUseCase.authenticate(
      authenticationData.email,
      authenticationData.password,
    );

    if (response.isError()) return badRequest(response.value);

    return ok(response.value);
  }
}
