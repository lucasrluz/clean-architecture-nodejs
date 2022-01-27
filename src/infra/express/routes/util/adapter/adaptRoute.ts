import { Request, Response } from 'express';
import { ControllerInterface } from '../../../../controllers/interfaces/controller';

export const adaptRoute = (controller: ControllerInterface) => {
  return async (req: Request, res: Response) => {
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    const response = await controller.perform(userData);

    return res.status(response.statusCode).json(response.value);
  };
};
