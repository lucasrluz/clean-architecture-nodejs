import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../src/infra/express/app';

describe('Authentication tests', () => {
  const prisma = new PrismaClient();

  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  describe('/login', () => {
    it('Should return jwt token', async () => {
      const userData = {
        username: 'lucas',
        email: 'lucas@gmail.com',
        password: 'lucas123',
      };

      await request(app).post('/user').send(userData);

      const response = await request(app)
        .post('/login')
        .send({ email: userData.email, password: userData.password });

      expect(response.status).toEqual(200);

      await prisma.user.deleteMany();
    });

    it('Should not return jwt token', async () => {
      const userData = {
        email: 'lucas@gmail.com',
        password: 'lucas123',
      };

      const response = await request(app)
        .post('/login')
        .send({ email: userData.email, password: userData.password });

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Email or password incorrect');
    });

    it('Should not return jwt token', async () => {
      const userData = {
        username: 'lucas',
        email: 'lucas@gmail.com',
        password: 'lucas123',
      };

      await request(app).post('/user').send(userData);

      const response = await request(app)
        .post('/login')
        .send({ email: userData.email, password: '123' });

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Email or password incorrect');

      await prisma.user.deleteMany();
    });
  });
});
