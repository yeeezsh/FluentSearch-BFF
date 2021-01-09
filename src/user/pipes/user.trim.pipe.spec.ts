// import { ValidationPipe } from "@nestjs/common";

import { ArgumentMetadata } from '@nestjs/common';
import { UserRegisterInput } from '../dtos/inputs/user-register.input';
import { UserTrimPipe } from './user.trim.pipe';

class CreateUserDtoTest implements UserRegisterInput {
  mainEmail!: string;
  name!: string;
  password!: string;
}

const metadata: ArgumentMetadata = {
  type: 'body',
  metatype: CreateUserDtoTest,
  data: '',
};

describe('User trim pipe', () => {
  let target: UserTrimPipe;

  beforeAll(() => {
    target = new UserTrimPipe();
  });

  it('Should trim space in mainEmail', async () => {
    const testPayload = { mainEmail: 'test@test.com   ', password: '123456' };
    const expectedPayload = { mainEmail: 'test@test.com', password: '123456' };
    const result = await target.transform(testPayload, metadata);
    expect(result).toEqual(expectedPayload);
  });

  it('Should not trim password', async () => {
    const testPayload = {
      mainEmail: 'test@test.com     ',
      password: '123456    ',
    };
    const expectedPayload = testPayload;
    const result = await target.transform(testPayload, metadata);
    expect(result.mainEmail.length).toBe(13);
    expect(result.password).toEqual(expectedPayload.password);
  });
});
