import { User } from '../../domain/user';
import { EncoderInterface } from '../../infra/bcrypt/interface/encoder-interface';
import { UserRepositoryInterface } from '../../infra/prisma/repositories/interfaces/user-repository-interface';
import { error, success } from '../../shared/response/response';
import { CreateUserUseCaseInterface } from './interfaces/create-user-use-case-interface';
import { ExistingUserError } from './util/errors/existing-user-error';

export class CreateUserUseCase implements CreateUserUseCaseInterface {
  private readonly userRepository: UserRepositoryInterface;
  private readonly encoder: EncoderInterface;

  constructor(
    userRepository: UserRepositoryInterface,
    encoder: EncoderInterface,
  ) {
    this.userRepository = userRepository;
    this.encoder = encoder;
  }

  async create(user: User) {
    const userOrError = User.create(user.username, user.email, user.password);

    if (userOrError.isError()) return error(userOrError.value.message);

    const userOrEmpty = await this.userRepository.findByUsernameAndEmail(
      user.username,
      user.email,
    );

    if (userOrEmpty.email) return error(new ExistingUserError().message);

    user.password = await this.encoder.encode(user.password);

    const response = await this.userRepository.create(user);

    return success({
      username: response.username,
      email: response.email,
    });
  }
}
