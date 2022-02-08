import { Request, Response } from 'express';
import { ControllerInterface } from '../../../../controllers/interfaces/controller';

export const adaptRoute = (controller: ControllerInterface) => {
  return async (req: Request, res: Response) => {
    const httpRequest = req.body;

    const response = await controller.perform(httpRequest);

    return res.status(response.statusCode).json(response.value);
  };
};
