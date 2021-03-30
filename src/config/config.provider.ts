import { Provider } from '@nestjs/common';
import { ConfigAppProviderType } from './@types/config-app.type';
import { APP_CONFIG } from './config.constant';
import { ProcessConfigType } from './process.config.type';

export const ConfigProvider: Provider = {
  provide: APP_CONFIG,
  useValue: ((): ConfigAppProviderType => {
    const {
      DATABASE_CONNECTION,
      DATABASE_USERNAME,
      DATABASE_PASSWORD,
      DATABASE_AUTH_SOURCE,
      JWT_SECRET_KEY,
      JWT_EXPIRES,
      OPS_KEY,
      ORIGIN,
      BCRYPT_SECRET_ROUND,
      PORT,
    } = process.env as ProcessConfigType;
    return {
      database: {
        connection:
          DATABASE_CONNECTION ||
          'mongodb://mongodb-sharded:27017/fluentsearch-bff',
        username: DATABASE_USERNAME || 'root',
        password: DATABASE_PASSWORD || 'FluentSearch@BFF.MongoDB',
        authSource: DATABASE_AUTH_SOURCE || 'admin',
      },
      jwt: {
        secretKey: JWT_SECRET_KEY || 'FluentSearch.BFF.DB.Password',
        expires: JWT_EXPIRES || '3600s',
      },
      opsKey: OPS_KEY || 'FluentSearch.BFF.OpsKey',
      node_env:
        (process.env.NODE_ENV as ConfigAppProviderType['node_env']) ||
        'development',
      origin: new RegExp(ORIGIN),
      bcrypt: {
        round: Number(BCRYPT_SECRET_ROUND || 10),
      },
      port: Number(PORT || 5000),
    };
  })(),
};
