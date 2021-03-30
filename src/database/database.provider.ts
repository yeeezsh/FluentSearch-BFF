import { Provider } from '@nestjs/common';
import mongoose from 'mongoose';
import { ConfigService } from '../config/config.service';
import { DATABASE_CONNECTION } from './constants/database.constant';

export const databaseProviders: Provider[] = [
  {
    provide: DATABASE_CONNECTION,
    inject: [ConfigService],
    useFactory: async (appConfig: ConfigService): Promise<typeof mongoose> => {
      const { database } = appConfig.get();
      return mongoose.connect(database.connection, {
        user: database.username,
        pass: database.password,
        authSource: database.authSource,
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
    },
  },
];
