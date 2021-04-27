import { Injectable } from '@nestjs/common';
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
    return {
      uri: connection,
      user: username,
      pass: password,
      authSource: authSource,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    };
  }
}
