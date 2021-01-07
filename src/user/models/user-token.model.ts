/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { OAuthProviderEnum } from '../schemas/enums/oauth-provider.enum';

@ObjectType()
export class UserToken {
  @Field(type => String)
  provider!: OAuthProviderEnum;

  @Field(type => String)
  token!: string;
}
