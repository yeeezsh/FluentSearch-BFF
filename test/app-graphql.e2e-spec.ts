import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppResolver GraphQL', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Query server status', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
      {
        serverStatus {
          status
        }
      }
      `,
      })
      .expect(res =>
        expect(res.body.data).toEqual({
          serverStatus: {
            status: 200,
          },
        }),
      );
  });
});
