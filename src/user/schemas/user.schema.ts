import { Schema } from 'mongoose';
import { userRoleConstant } from './enums/user-role.enum';
import { userTokenSchema } from './user-token.schema';

const userSchema = new Schema({
  email: { type: [String], required: true },
  password: { type: String, required: true },
  oauth: { type: [userTokenSchema], required: false, default: [] },
  name: { type: String, required: true },

  // logic

  role: { type: String, required: true, enum: userRoleConstant },

  //   meta
  createDate: { type: Date, default: Date.now, required: true },
  updateDate: { type: Date, default: Date.now, required: true },
});

export default userSchema;
