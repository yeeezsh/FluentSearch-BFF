/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { IUserToken } from '../interfaces/user-token';
import { OAuthProviderEnum } from '../schemas/enums/oauth-provider.enum';

@ObjectType()
export class UserToken implements IUserToken {
  @Field(() => String)
  provider: OAuthProviderEnum;

  @Field(() => String)
  token: string;
}
