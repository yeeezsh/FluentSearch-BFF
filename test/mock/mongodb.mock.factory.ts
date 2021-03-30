import { Logger } from '@nestjs/common';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { ConfigAppProviderType } from '../../src/config/@types/config-app.type';

export const mongodbMockFactory = async (
  replSet: MongoMemoryReplSet,
): Promise<ConfigAppProviderType['database']> => {
  await replSet.waitUntilRunning();
  const uri = await replSet.getUri();
  const onJest = process.env.JEST_WORKER_ID !== undefined;
  Logger.log(`Running on Jest: ${onJest}`);
  Logger.log(`Mock replica URI: ${uri}`);
  return {
    connection: uri,
    username: '',
    password: '',
    authSource: 'admin',
  };
};
