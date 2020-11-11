import { Schema } from 'mongoose';
import {
  userPackageConstant,
  UserPackageEnum,
} from './enums/user-package.enum';
import { userRoleConstant, UserRoleEnum } from './enums/user-role.enum';
import { userTokenSchema } from './user-token.schema';

const userSchema = new Schema({
  email: { type: [String], required: true },
  password: { type: String, required: true },
  oauth: { type: [userTokenSchema], required: false, default: [] },
  name: { type: String, required: true },

  // logic

  role: { type: UserRoleEnum, required: true, enum: userRoleConstant },
  package: { type: UserPackageEnum, required: true, enum: userPackageConstant },

  //   meta
  createDate: { type: Date, default: Date.now, required: true },
  updateDate: { type: Date, default: Date.now, required: true },
});

export default userSchema;
