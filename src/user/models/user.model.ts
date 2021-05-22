/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  UserPackageEnum,
  UserRoleEnum,
  UserZoneEnum,
} from 'fluentsearch-types';
import { IUser } from '../interfaces/user';
import { UserToken } from './user-token.model';

// enums
registerEnumType(UserRoleEnum, { name: 'UserRoleEnum' });
registerEnumType(UserPackageEnum, { name: 'UserPackageEnum' });
registerEnumType(UserZoneEnum, { name: 'UserZoneEnum' });

@ObjectType()
export class User implements IUser {
  @Field(() => String)
  mainEmail: string;

  @Field(() => [String])
  email: string[];

  @Field(() => String)
  password: string;

  @Field(() => UserToken)
  oauth: UserToken[] | [];

  @Field(() => String, { nullable: true })
  name: string;

  // logic
  @Field(() => UserRoleEnum)
  role: UserRoleEnum;

  @Field(() => UserPackageEnum)
  package: UserPackageEnum;

  //   meta
  @Field(() => UserZoneEnum)
  zone: UserZoneEnum;

  @Field(() => Boolean, { nullable: true })
  deactivate?: boolean;

  //TODO: need Date as a scalar type
  @Field(() => String)
  createDate: Date;

  @Field(() => String)
  updateDate: Date;
}

@ObjectType()
export class UserWithId extends User {
  @Field(() => String)
  _id: Date;
}
