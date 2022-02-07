import { GenerateNewRefreshTokenUseCaseInterface } from '../../../app/useCases/authentication/interface/generate-new-refresh-token-use-case-interface';
import { ControllerInterface } from '../interfaces/controller';
import { badRequest, ok } from '../util/response/responses';

export class GenerateNewRefreshTokenController implements ControllerInterface {
  private readonly refreshTokenUseCase: GenerateNewRefreshTokenUseCaseInterface;

  constructor(refreshTokenUseCase: GenerateNewRefreshTokenUseCaseInterface) {
    this.refreshTokenUseCase = refreshTokenUseCase;
  }

  async perform(refreshTokenId: string) {
    const response = await this.refreshTokenUseCase.create(refreshTokenId);

    if (response.isError()) {
      return badRequest(response.value);
    }

    return ok(response.value);
  }
}
