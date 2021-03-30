import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { gql } from 'apollo-server-express';
import { print } from 'graphql';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserResolver GraphQL', () => {
  let app: INestApplication;
  let userId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('CreateUser Mutation should able to create user', () => {
    const userInput = gql`
      mutation {
        CreateUser(
          UserRegisterInput: {
            mainEmail: "test3@test.com"
            name: "euei99"
            password: "123456"
          }
        ) {
          _id
          mainEmail
          name
        }
      }
    `;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(userInput),
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
    const userUpdateInput = gql`
      mutation {
        UpdateUser(
          UserUpdateInput: {
            id: ${userId}
            mainEmail: "test5@test.com"
            name: "euei999"
          }
        ) {
          mainEmail
          name
        }
      }
    `;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(userUpdateInput),
      })
      .expect(res => {
        const data = res.body.data;
        expect(data.UpdateUser).toEqual({
          mainEmail: 'test5@test.com',
          name: 'euei999',
        });
      });
  });

  it('CreateUser Mutation should able to validate/preventing duplicated email', () => {
    const duplicatedUserInput = gql`
      mutation {
        CreateUser(
          UserRegisterInput: {
            mainEmail: "test5@test.com"
            name: "euei99"
            password: "123456"
          }
        ) {
          mainEmail
          name
        }
      }
    `;
    const badUserInput = gql`
      mutation {
        CreateUser(
          UserRegisterInput: {
            mainEmail: "test.com"
            name: "euei99"
            password: "12345"
          }
        ) {
          mainEmail
          name
        }
      }
    `;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(duplicatedUserInput),
      })

      .expect(res => {
        const errors = res.body.errors;
        expect(errors[0].message).toEqual('Duplicated email');
      })
      .then(() =>
        request(app.getHttpServer())
          .post('/graphql')
          .send({ query: print(badUserInput) })
          .expect(res => {
            const errors =
              res.body.errors[0].extensions.exception.response.message;
            expect(errors).toHaveLength(2);
          }),
      );
  });

  afterAll(async () => {
    await app.close();
  });
});
