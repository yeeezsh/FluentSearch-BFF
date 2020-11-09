import { Provider } from '@nestjs/common';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from './constants/database.constant';

export const mockDatabaseProviders: Provider[] = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (): Promise<typeof mongoose> => {
      const replSet = new MongoMemoryReplSet();
      await replSet.waitUntilRunning();
      const uri = await replSet.getUri();
      console.log('Mock replica URI: ', uri);
      return await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    },
  },
];
