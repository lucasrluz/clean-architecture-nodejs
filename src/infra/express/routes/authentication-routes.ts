import { Router } from 'express';
import { makeAuthenticateController } from '../../controllers/authentication/util/factories/make-authenticate-controller';
import { adaptRoute } from './util/adapter/adaptRoute';

export const authenticationRouter = Router();

authenticationRouter.post('/login', adaptRoute(makeAuthenticateController()));
