import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { SkipLimitArgs } from '../user/dtos/args/skip-limit.args';
import { RecentFiles } from './dtos/recent-files.dto';
import { FilesService } from './files.service';

@Resolver()
export class FilesResolver {
  constructor(private readonly fileService: FilesService) {}
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
