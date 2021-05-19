import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { gql } from 'apollo-server-express';
import { print } from 'graphql';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { AppModel } from '../src/app.resolver';

describe('AppResolver GraphQL', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Query server status', () => {
    const expectedReturns: AppModel = { status: 200 };
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(gql`
          {
            ServerStatus {
              status
            }
          }
        `),
      })
      .expect(res =>
        expect(res.body.data).toEqual({
          ServerStatus: {
            ...expectedReturns,
          },
        }),
      );
  });
});
