import {
  UserPackageEnum,
  UserRoleEnum,
  UserZoneEnum,
} from 'fluentsearch-types';
import { UserToken } from '../models/user-token.model';

export interface IUser {
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
  //TODO: need Date as a scalar type
  createDate: Date;
  updateDate: Date;
}
