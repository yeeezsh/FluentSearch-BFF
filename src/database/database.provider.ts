import { Provider } from '@nestjs/common';
import mongoose from 'mongoose';
import { APP_CONFIG } from '../config/config.constant';
import { ConfigurationInterface } from '../config/config.interface';
import { DATABASE_CONNECTION } from './constants/database.constant';

export const databaseProviders: Provider[] = [
  {
    provide: DATABASE_CONNECTION,
    inject: [APP_CONFIG],
    useFactory: async (
      appConfig: ConfigurationInterface,
    ): Promise<typeof mongoose> => {
      return mongoose.connect(appConfig.database.connection, {
        user: appConfig.database.username,
        pass: appConfig.database.password,
        authSource: appConfig.database.authSource,
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
    },
  },
];
