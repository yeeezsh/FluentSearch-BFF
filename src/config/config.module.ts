import { Module } from '@nestjs/common';
import { configProviders } from './config.providers';

@Module({
  providers: [...configProviders],
  exports: [...configProviders],
})
export class ConfigModule {}
