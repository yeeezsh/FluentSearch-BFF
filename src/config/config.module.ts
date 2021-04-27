import { Module } from '@nestjs/common';
import { ConfigDatabaseService } from './config.database.service';
import { ConfigService } from './config.service';

@Module({
  providers: [ConfigService, ConfigDatabaseService],
  exports: [ConfigService, ConfigDatabaseService],
})
export class ConfigModule {}
