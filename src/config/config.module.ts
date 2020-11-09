import { Module } from '@nestjs/common';
import { configProviders } from './config.providers';

export const APP_CONFIG = 'APP_CONFIG';

@Module({
  providers: [...configProviders],
  exports: [...configProviders],
})
export class ConfigModule {}
