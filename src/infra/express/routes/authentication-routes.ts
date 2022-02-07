import { Router } from 'express';
import { makeAuthenticateController } from '../../controllers/authentication/util/factories/make-authenticate-controller';
import { makeGenerateNewRefreshTokenController } from '../../controllers/authentication/util/factories/make-generate-new-refresh-token-controller';
import { adaptRoute } from './util/adapter/adaptRoute';
import { generateNewRefreshTokenAdapRoute } from './util/adapter/generate-new-refresh-token-adap-route';

export const authenticationRouter = Router();

authenticationRouter.post('/login', adaptRoute(makeAuthenticateController()));
authenticationRouter.post(
  '/refresh_token',
  generateNewRefreshTokenAdapRoute(makeGenerateNewRefreshTokenController()),
);
