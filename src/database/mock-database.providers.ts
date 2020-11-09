import { Provider } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from './constants/database.constant';

const replSet = new MongoMemoryServer();

export const mockDatabaseProviders: Provider[] = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (): Promise<typeof mongoose> => {
      const uri = await replSet.getUri();
      const onJest = process.env.JEST_WORKER_ID !== undefined;
      console.log('Running on Jest: ', onJest);
      console.log('Mock replica URI: ', uri);
      return await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    },
  },
];
