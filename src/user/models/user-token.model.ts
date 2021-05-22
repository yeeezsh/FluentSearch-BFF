/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { OAuthProviderEnum } from 'fluentsearch-types';
import { IUserToken } from '../interfaces/user-token';

@ObjectType()
export class UserToken implements IUserToken {
  @Field(() => String)
  provider: OAuthProviderEnum;

  @Field(() => String)
  token: string;
}
