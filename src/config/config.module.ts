import { Module } from '@nestjs/common';
import { ConfigDatabaseService } from './config.database.service';
import { ConfigProvider } from './config.provider';
import { ConfigService } from './config.service';

@Module({
  providers: [ConfigProvider, ConfigService, ConfigDatabaseService],
  exports: [ConfigProvider, ConfigService, ConfigDatabaseService],
})
export class ConfigModule {}
