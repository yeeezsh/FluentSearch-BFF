import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FILES_SCHEMA_NAME } from 'fluentsearch-types';
import fileSchema from 'fluentsearch-types/dist/entity/file.entity';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ConfigModule } from '../config/config.module';
import { FilesResolver } from './files.resolver';
import { FilesService } from './files.service';

@Module({
  imports: [
    ConfigModule,
    AuthenticationModule,
    MongooseModule.forFeature([
      {
        name: FILES_SCHEMA_NAME,
        schema: fileSchema,
      },
    ]),
  ],
  providers: [FilesService, FilesResolver],
})
export class FilesModule {}
