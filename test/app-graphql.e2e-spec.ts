import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { gql } from 'apollo-server-express';
import { print } from 'graphql';
import mongoose from 'mongoose';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { AppModel } from '../src/app.resolver';
import { DATABASE_CONNECTION } from '../src/database/constants/database.constant';
import { mongodbMockFactory, replSet } from './mock/mongodb.mock.factory';

describe('AppResolver GraphQL', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DATABASE_CONNECTION)
      .useFactory({
        factory: async () => await mongodbMockFactory(),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await replSet.stop();
    await app.close();
  });

  it('Query server status', () => {
    const expectedReturns: AppModel = { status: 200 };
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(gql`
          {
            serverStatus {
              status
            }
          }
        `),
      })
      .expect(res =>
        expect(res.body.data).toEqual({
          serverStatus: {
            ...expectedReturns,
          },
        }),
      );
  });
});
