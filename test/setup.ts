import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { ConfigEnvType } from '../src/config/@types/config-env.type';
import { mongodbMockFactory } from './mock/mongodb.mock.factory';

// 60s timeout
jest.setTimeout(60000);

const replSet = new MongoMemoryReplSet({
  replSet: { storageEngine: 'wiredTiger' },
});

beforeAll(async () => {
  const db = await mongodbMockFactory(replSet);

  process.env = {
    DATABASE_CONNECTION: db.connection,
    DATABASE_USERNAME: db.username,
    DATABASE_PASSWORD: db.password,
    DATABASE_AUTH_SOURCE: db.authSource,
    MINIO_ACCESS_KEY: 'root',
    MINIO_SECRET_KEY: '12345678',
    MINIO_SERVER_ENDPOINT: 'minio',
    MINIO_SERVER_PORT: '9000',
    MINIO_SERVER_SSL: 'false',
  } as ConfigEnvType;
});

afterAll(async () => {
  await replSet.stop();
});
