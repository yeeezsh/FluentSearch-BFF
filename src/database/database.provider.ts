import { Provider } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from './constants/database.constant';

export const databaseProviders: Provider[] = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (): Promise<typeof mongoose> => {
      return mongoose.connect(
        'mongodb://mongodb-sharded:27017/fluent-search-bff',
        {
          user: 'root',
          pass: 'fluent-search-bff-db',
          authSource: 'admin',
          useCreateIndex: true,
          useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        },
      );
    },
  },
];
