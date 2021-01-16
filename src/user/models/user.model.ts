/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { IUser } from '../interfaces/user';
import { UserPackageEnum } from '../schemas/enums/user-package.enum';
import { UserRoleEnum } from '../schemas/enums/user-role.enum';
import { UserZoneEnum } from '../schemas/enums/user.zone.enum';
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

export class UserDoc extends Document {}

@ObjectType()
export class UserWithId extends User {
  @Field(() => String)
  _id: Date;
}
