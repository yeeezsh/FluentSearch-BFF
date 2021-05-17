import { Injectable, Logger } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigService } from './config.service';

@Injectable()
export class ConfigDatabaseService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    const {
      connection,
      username,
      password,
      authSource,
    } = this.configService.get().database;

    Logger.log(this.configService.get().database, 'DB config');
    return {
      uri: connection,
      auth: {
        user: username,
        password: password,
      },
      authSource: authSource,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    };
  }
}
