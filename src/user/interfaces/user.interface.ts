import { Document } from 'mongoose';
import { UserRoleEnum } from '../schemas/enums/user-role.enum';
import { UserToken } from './user-token.interface';

export interface User {
  role: UserRoleEnum;
  email: string;
  password: string;
  oauth: UserToken[] | [];
  name: string;

  //   meta
  createDate: Date;
  updateDate: Date;
}

export type UserDoc = User & Document;
