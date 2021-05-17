import MongoStore from 'connect-mongo';
import { ConfigAppProviderType } from '../../config/@types/config-app.type';

export default (config: ConfigAppProviderType) => {
  return MongoStore.create({
    dbName: 'sessions',
    mongoUrl: config.database.connection,
    mongoOptions: {
      authSource: config.database.authSource,
      useNewUrlParser: true,
      auth: {
        user: config.database.username,
        password: config.database.password,
      },
    },
  });
};
