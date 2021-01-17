import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from '../database/constants/database.constant';
import { USER_COLLECTION } from './constants/user.collection.constant';
import { USER_MODEL } from './constants/user.provider.constant';
import userSchema from './schemas/user.schema';

export const userProviders: Provider[] = [
  {
    inject: [DATABASE_CONNECTION],
    provide: USER_MODEL,
    useFactory: async (conn: Connection) => {
      return conn.model(USER_COLLECTION, userSchema);
    },
  },
];
