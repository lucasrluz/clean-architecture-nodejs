import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../src/infra/express/app';

describe('User tests', () => {
  const prisma = new PrismaClient();

  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  describe('/user (POST)', () => {
    it('Should save new user', async () => {
      const userData = {
        username: 'lucas',
        email: 'lucas@gmail.com',
        password: 'lucas123',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(201);
      expect(response.body).toEqual({
        username: userData.username,
        email: userData.email,
      });

      await prisma.user.deleteMany();
    });

    it('Should return message if user already registered', async () => {
      const userData = {
        username: 'lucas',
        email: 'lucas@gmail.com',
        password: 'lucas123',
      };

      await request(app).post('/user').send(userData);

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('User already registered');

      await prisma.user.deleteMany();
    });

    it('Should return message of invalid username', async () => {
      const userData = {
        username: '',
        email: 'lucas@gmail.com',
        password: 'lucas123',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Invalid username');
    });

    it('Should return message of invalid username', async () => {
      const userData = {
        username: 'abcdefghijklmnop',
        email: 'lucas@gmail.com',
        password: 'lucas123',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Invalid username');
    });

    it('Should return message of invalid email', async () => {
      const userData = {
        username: 'lucas',
        email: '',
        password: 'lucas123',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Invalid email');
    });

    it('Should return message of invalid email', async () => {
      let bigEmail = '';

      while (bigEmail.length < 65) {
        bigEmail += 'a';
      }

      bigEmail += '@gmail.com';

      const userData = {
        username: 'lucas',
        email: bigEmail,
        password: 'lucas123',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Invalid email');
    });

    it('Should return message of invalid email', async () => {
      const userData = {
        username: 'lucas',
        email: 'lucas@',
        password: 'lucas123',
      };

      while (userData.email.length < 262) {
        userData.email += 'a';
      }

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Invalid email');
    });

    it('Should return message of invalid password', async () => {
      const userData = {
        username: 'lucas',
        email: 'lucas@gmail.com',
        password: '123',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Invalid password');
    });

    it('Should return message of invalid password', async () => {
      const userData = {
        username: 'lucas',
        email: 'lucas@gmail.com',
        password: '012345678901234567890',
      };

      const response = await request(app).post('/user').send(userData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual('Invalid password');
    });
  });
});
