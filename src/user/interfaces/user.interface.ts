import { Document } from 'mongoose';
import { RoleEnum } from '../schemas/enums/role.enum';
import { UserToken } from './user-token.interface';

export interface User {
  role: RoleEnum;
  email: string;
  password: string;
  oauth: UserToken[] | [];
  name: string;

  //   meta
  createDate: Date;
  updateDate: Date;
}

export type UserDoc = User & Document;
