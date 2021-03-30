import { Module } from '@nestjs/common';
import { ConfigProvider } from './config.provider';
import { ConfigService } from './config.service';

@Module({
  providers: [ConfigProvider, ConfigService],
  exports: [ConfigProvider, ConfigService],
})
export class ConfigModule {}
