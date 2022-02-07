import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../src/infra/express/app';
import { sleep } from './util/sleep';

jest.setTimeout(20000);

describe('Authentication tests', () => {
  const prisma = new PrismaClient();

  beforeAll(async () => {
    await prisma.refreshToken.deleteMany();
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

      await prisma.refreshToken.deleteMany();
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

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });
  });

  describe('refresh_token', () => {
    it('Should return new refresh token', async () => {
      const userData = {
        username: 'lucas',
        email: 'lucas@gmail.com',
        password: 'lucas123',
      };

      await request(app).post('/user').send(userData);

      const jwtAndRefreshToken = await request(app)
        .post('/login')
        .send({ email: userData.email, password: userData.password });

      const refreshToken = jwtAndRefreshToken.body.refreshToken;

      await sleep(15000);

      const response = await request(app)
        .post('/refresh_token')
        .send({ refreshTokenId: refreshToken });

      expect(response.status).toEqual(200);

      expect(response.body.refreshToken).not.toEqual(refreshToken);

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should return refresh token', async () => {
      const userData = {
        username: 'lucas',
        email: 'lucas@gmail.com',
        password: 'lucas123',
      };

      await request(app).post('/user').send(userData);

      const jwtAndRefreshToken = await request(app)
        .post('/login')
        .send({ email: userData.email, password: userData.password });

      const refreshToken = jwtAndRefreshToken.body.refreshToken;

      const response = await request(app)
        .post('/refresh_token')
        .send({ refreshTokenId: refreshToken });

      expect(response.status).toEqual(200);
      expect(response.body.refreshToken).toEqual(refreshToken);

      await prisma.refreshToken.deleteMany();
      await prisma.user.deleteMany();
    });

    it('Should return message of refresh token not found', async () => {
      const response = await request(app)
        .post('/refresh_token')
        .send({ refreshTokenId: 'refreshTokenInvalid' });

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Refresh token not found');
    });
  });
});
