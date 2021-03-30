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
  } as ConfigEnvType;
});

afterAll(async () => {
  await replSet.stop();
});
