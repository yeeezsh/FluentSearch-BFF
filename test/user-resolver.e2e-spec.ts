import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { DATABASE_CONNECTION } from '../src/database/constants/database.constant';
import { mongodbMockFactory, replSet } from './mock/mongodb.mock.factory';

describe('UserResolver GraphQL', () => {
  let app: INestApplication;
  let userId: string;

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
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await replSet.stop();
    await app.close();
  });

  it('CreateUser Mutation should able to create user', () => {
    const userInput = `
    mutation {
        CreateUser(
            UserRegisterInput: 
            { 
                mainEmail: "test3@test.com", 
                name: "euei99", 
                password: "123456"
            }
                ) 
            {
                _id
                mainEmail
                name
    }
  }
  `;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: userInput,
      })
      .expect(res => {
        const user = res.body.data.CreateUser;
        userId = user._id;
        expect(user).toEqual({
          mainEmail: 'test3@test.com',
          name: 'euei99',
          _id: userId,
        });
      });
  });

  it('UpdateUser Mutation should able to update user', () => {
    const userUpdateInput = `
    mutation {
      UpdateUser(UserUpdateInput: {
        id: "${userId}",
        mainEmail: "test5@test.com",
        name: "euei999"
      }) {
        mainEmail
        name
      }
    }
  `;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: userUpdateInput,
      })
      .expect(res => {
        const data = res.body.data;
        expect(data.UpdateUser).toEqual({
          mainEmail: 'test5@test.com',
          name: 'euei999',
        });
      });
  });

  it('CreateUser Mutation should able to validate/ preventing duplicated email', () => {
    const duplicatedUserInput = `
    mutation {
        CreateUser(
            UserRegisterInput: 
            { 
                mainEmail: "test5@test.com", 
                name: "euei99", 
                password: "123456"
            }
                ) 
            {
                mainEmail
                name
    }
  }
  `;
    const badUserInput = `
    mutation {
        CreateUser(
            UserRegisterInput: 
            { 
                mainEmail: "test.com", 
                name: "euei99", 
                password: "12345"
            }
                ) 
            {
                mainEmail
                name
    }
  }
  `;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: duplicatedUserInput,
      })
      .expect(res => {
        const errors = res.body.errors;
        expect(errors[0].message).toEqual('Duplicated email');
      })
      .then(() =>
        request(app.getHttpServer())
          .post('/graphql')
          .send({ query: badUserInput })
          .expect(res => {
            const errors =
              res.body.errors[0].extensions.exception.response.message;
            expect(errors).toHaveLength(2);
          }),
      );
  });
});
