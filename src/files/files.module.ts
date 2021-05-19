import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { FilesResolver } from './files.resolver';
import { FilesService } from './files.service';

@Module({
  imports: [ConfigModule],
  providers: [FilesService, FilesResolver],
})
export class FilesModule {}
