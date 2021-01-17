import { UserToken } from '../models/user-token.model';
import { UserPackageEnum } from '../schemas/enums/user-package.enum';
import { UserRoleEnum } from '../schemas/enums/user-role.enum';
import { UserZoneEnum } from '../schemas/enums/user.zone.enum';

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
