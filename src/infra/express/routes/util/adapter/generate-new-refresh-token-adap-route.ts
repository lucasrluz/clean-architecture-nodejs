import { Request, Response } from 'express';
import { ControllerInterface } from '../../../../controllers/interfaces/controller';

export const generateNewRefreshTokenAdapRoute = (
  controller: ControllerInterface,
) => {
  return async (req: Request, res: Response) => {
    const authData = {
      refreshTokenId: req.body.refreshTokenId,
    };

    const response = await controller.perform(authData.refreshTokenId);

    return res.status(response.statusCode).json(response.value);
  };
};
