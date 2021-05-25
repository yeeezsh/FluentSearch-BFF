import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { ConfigService } from '../config/config.service';
import { SkipLimitArgs } from '../user/dtos/args/skip-limit.args';
import { FileModelDTO } from './dtos/file/file.dto.model';
import { RecentFiles } from './dtos/recent-files.dto';
import { FilesService } from './files.service';

@Resolver()
export class FilesResolver {
  constructor(
    private readonly fileService: FilesService,
    private readonly configSerivce: ConfigService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => FileModelDTO)
  async GetFileById(
    @Args('id') fileId: string,
    @Context('req') req: Request,
  ): Promise<FileModelDTO> {
    const session = req.session as Record<string, any>;
    const owner = session.user._id;
    const file = await this.fileService.getFile(fileId, owner);
    return {
      ...file,
      uri: `http://${this.configSerivce.get().storage_endpoint}/${owner}/${
        file._id
      }`,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => RecentFiles)
  async GetRecentFiles(
    @Args() skipLimit: SkipLimitArgs,
    @Context('req') req: Request,
  ): Promise<RecentFiles> {
    const session = req.session as Record<string, any>;
    const id = session.user._id;
    const result = await this.fileService.getRecentFilesByUser(
      id,
      skipLimit.skip,
      skipLimit.limit,
    );
    return { result };
  }
}
