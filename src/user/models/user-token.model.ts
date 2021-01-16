/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { OAuthProviderEnum } from '../schemas/enums/oauth-provider.enum';

@ObjectType()
export class UserToken {
  @Field(() => String)
  provider: OAuthProviderEnum;

  @Field(() => String)
  token: string;
}
