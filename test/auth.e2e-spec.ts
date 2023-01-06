import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Body } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';

const loginDto: AuthDto = {
  login: 'asxsa@gmail.com',
  password: '12342',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - success', (done) => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body: { access_token } }: request.Response) => {
        expect(access_token).toBeDefined();
        done();
      });
  });

  it('/auth/login (POST) - fail', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({...loginDto, password: '132'})
      .expect(401);
  });
});
