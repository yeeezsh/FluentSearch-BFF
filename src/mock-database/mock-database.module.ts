import { Module } from '@nestjs/common';
import { mockDatabaseProviders } from './mock-database.providers';

@Module({
  providers: [...mockDatabaseProviders],
})
export class MockDatabaseModule {}
