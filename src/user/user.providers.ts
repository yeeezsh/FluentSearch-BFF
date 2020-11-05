import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from 'src/database/constants/database.constant';
import { USER_MODEL } from './constants/user.provider.constant';
import userSchema from './schemas/user.schema';

export const userProivders: Provider[] = [
  {
    inject: [DATABASE_CONNECTION],
    provide: USER_MODEL,
    useFactory: async (conn: Connection) => {
      return conn.model('user', userSchema);
    },
  },
];
