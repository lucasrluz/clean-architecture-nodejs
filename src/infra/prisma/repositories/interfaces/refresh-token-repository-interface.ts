import { RefreshToken } from '../../../../domain/refreshToken/refresh-token';

export interface RefreshTokenRepositoryInterface {
  create(refreshToken: RefreshToken): Promise<{ refreshToken: string }>;
  findById(refreshTokenId: string): Promise<RefreshToken | null>;
  deleteById(refreshTokenId: string): Promise<void>;
  deleteByUserId(userId: string): Promise<void>;
}
