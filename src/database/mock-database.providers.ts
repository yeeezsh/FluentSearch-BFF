import { Provider } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { mockDatabaseFactory } from '../utils/mock-database.factory';
import { DATABASE_CONNECTION } from './constants/database.constant';

export const mockDatabaseProviders: Provider[] = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (): Promise<typeof mongoose> => {
      return mockDatabaseFactory();
    },
  },
];
