import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { databaseProviders } from './database.provider';

@Module({
  imports: [UserModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
