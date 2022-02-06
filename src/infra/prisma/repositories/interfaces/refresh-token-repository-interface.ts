import { RefreshToken } from '../../../../domain/refreshToken/refresh-token';

export interface RefreshTokenRepositoryInterface {
  create(refreshToken: RefreshToken): Promise<{ refreshToken: string }>;
  deleteByUserId(userId: string): Promise<void>;
}
