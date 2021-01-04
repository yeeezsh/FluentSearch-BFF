import { Document } from 'mongoose';
import { UserPackageEnum } from '../schemas/enums/user-package.enum';
import { UserRoleEnum } from '../schemas/enums/user-role.enum';
import { UserZoneEnum } from '../schemas/enums/user.zone.enum';
import { UserToken } from './user-token.interface';

export interface User {
  mainEmail: string;
  email: string[];
  password: string;
  oauth: UserToken[] | [];
  name: string;

  // logic
  role: UserRoleEnum;
  package: UserPackageEnum;

  //   meta
  zone: UserZoneEnum;
  deactivate?: boolean;
  createDate: Date;
  updateDate: Date;
}

export type UserDoc = User & Document;
