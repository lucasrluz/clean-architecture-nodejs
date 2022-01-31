import express from 'express';
import { userRouter } from './routes/user-routes';
import dotenv from 'dotenv';
import { authenticationRouter } from './routes/authentication-routes';

dotenv.config();

export const app = express();

app.use(express.json());
app.use(userRouter);
app.use(authenticationRouter);
