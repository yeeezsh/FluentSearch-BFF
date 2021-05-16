import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  UserPackageEnum,
  UserRoleEnum,
  UserSessionDto,
  UserZoneEnum,
} from 'fluentsearch-types';

registerEnumType(UserRoleEnum, { name: 'UserRoleEnumSession' });
registerEnumType(UserPackageEnum, { name: 'UserPackageEnumSession' });
registerEnumType(UserZoneEnum, { name: 'UserZoneEnumSession' });

@ObjectType()
export class UserSessionDTO implements UserSessionDto {
  @Field()
  _id: string;

  @Field()
  mainEmail: string;

  @Field()
  name: string;

  @Field(() => UserRoleEnum)
  role: UserRoleEnum;

  @Field(() => UserPackageEnum)
  package: UserPackageEnum;

  @Field(() => UserZoneEnum)
  zone: UserZoneEnum;
}
