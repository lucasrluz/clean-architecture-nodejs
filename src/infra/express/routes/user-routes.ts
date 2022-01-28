import { Router } from 'express';
import { makeCreateUserController } from '../../controllers/user/util/factories/make-create-user-controller';
import { adaptRoute } from './util/adapter/adaptRoute';

export const userRouter = Router();

userRouter.post('/user', adaptRoute(makeCreateUserController()));
