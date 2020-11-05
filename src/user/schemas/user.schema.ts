import { Schema } from 'mongoose';
import { roleConstant } from './enums/role.enum';
import { userTokenSchema } from './user-token.schema';

const userSchema = new Schema({
  role: { type: String, required: true, enum: roleConstant },
  email: { type: [String], required: true },
  password: { type: String, required: true },
  oauth: { type: [userTokenSchema], required: false, default: [] },
  name: { type: String, required: true },

  //   meta
  createDate: { type: Date, default: Date.now, required: true },
  updateDate: { type: Date, default: Date.now },
});

export default userSchema;
