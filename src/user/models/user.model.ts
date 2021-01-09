/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { UserPackageEnum } from '../schemas/enums/user-package.enum';
import { UserRoleEnum } from '../schemas/enums/user-role.enum';
import { UserZoneEnum } from '../schemas/enums/user.zone.enum';
import { UserToken } from './user-token.model';

// enums
registerEnumType(UserRoleEnum, { name: 'UserRoleEnum' });
registerEnumType(UserPackageEnum, { name: 'UserPackageEnum' });
registerEnumType(UserZoneEnum, { name: 'UserZoneEnum' });

@ObjectType()
export class User {
  @Field(type => String)
  mainEmail!: string;

  @Field(type => [String])
  email!: string[];

  @Field(type => String)
  password!: string;

  @Field(type => UserToken)
  oauth!: UserToken[] | [];

  @Field(type => String, { nullable: true })
  name!: string;

  // logic
  @Field(type => UserRoleEnum)
  role!: UserRoleEnum;

  @Field(type => UserPackageEnum)
  package!: UserPackageEnum;

  //   meta
  @Field(type => UserZoneEnum)
  zone!: UserZoneEnum;

  @Field(type => Boolean, { nullable: true })
  deactivate?: boolean;

  //TODO: need Date as a scalar type
  @Field(type => String)
  createDate!: Date;

  @Field(type => String)
  updateDate!: Date;
}

export class UserDoc extends Document {}
