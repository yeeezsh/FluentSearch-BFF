import { Injectable } from '@nestjs/common';
import { ConfigAppProviderType } from './@types/config-app.type';
import { ConfigEnvType } from './@types/config-env.type';

@Injectable()
export class ConfigService {
  get(): ConfigAppProviderType {
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
      SESSION_EXPIRES,
      SESSION_SECRET,
      HOSTNAME,
      MAIN_HOSTNAME,
      STORAGE_ENDPOINT,
      MINIO_ACCESS_KEY,
      MINIO_SECRET_KEY,
      MINIO_SERVER_ENDPOINT,
      MINIO_SERVER_PORT,
      MINIO_SERVER_SSL,
    } = process.env as ConfigEnvType;
    return {
      hostname: HOSTNAME,
      main_hostname: MAIN_HOSTNAME,
      database: {
        connection:
          DATABASE_CONNECTION ||
          'mongodb://mongodb-sharded:27017/fluentsearch-bff',
        username: DATABASE_USERNAME,
        password: DATABASE_PASSWORD,
        authSource: DATABASE_AUTH_SOURCE,
      },
      jwt: {
        secretKey: JWT_SECRET_KEY || 'FluentSearch.JWT.SECRET',
        expires: Number(JWT_EXPIRES || 300000), // 5 minutes
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
      session: {
        secret: SESSION_SECRET || 'FluentSearch.SESSION.SECRET',
        expires: Number(SESSION_EXPIRES || 86400000), // one day
      },
      storage_endpoint: STORAGE_ENDPOINT,
      minio: {
        endpoint: MINIO_SERVER_ENDPOINT,
        access_key: MINIO_ACCESS_KEY,
        secret_key: MINIO_SECRET_KEY,
        port: Number(MINIO_SERVER_PORT),
        ssl: MINIO_SERVER_SSL === 'true',
      },
    };
  }
}
