import { Schema } from 'mongoose';
import { oAuthProviderConstant } from './enums/provider.enum';

export const userTokenSchema = new Schema(
  {
    provider: { type: String, required: true, enum: oAuthProviderConstant },
    token: { type: String, required: true },
  },
  { _id: false },
);
