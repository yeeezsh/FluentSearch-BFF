import { Args, Query, Resolver } from '@nestjs/graphql';
import { SkipLimitArgs } from '../user/dtos/args/skip-limit.args';
import { RecentFiles } from './dtos/recent-files.dto';

@Resolver()
export class FilesResolver {
  @Query(() => RecentFiles)
  async getRecentFiles(@Args() skipLimit: SkipLimitArgs): Promise<RecentFiles> {
    return {
      result: [
        {
          date: new Date(),
          files: [
            {
              label: 'test.jpeg',
              uri: 'http://storage.fluentsearch.ml/123/456',
              uri_thumbnail: 'http://storage.fluentsearch.ml/123/456',
              createAt: new Date(),
              updateAt: new Date(),
            },

            {
              label: 'test1.jpeg',
              uri: 'http://storage.fluentsearch.ml/123/456',
              uri_thumbnail: 'http://storage.fluentsearch.ml/123/456',
              createAt: new Date(),
              updateAt: new Date(),
            },
            {
              label: 'test2.jpeg',
              uri: 'http://storage.fluentsearch.ml/123/456',
              uri_thumbnail: 'http://storage.fluentsearch.ml/123/456',
              createAt: new Date(),
              updateAt: new Date(),
            },
          ],
        },
        {
          date: new Date('01/01/1999'),
          files: [
            {
              label: 'test.jpeg',
              uri: 'http://storage.fluentsearch.ml/123/456',
              uri_thumbnail: 'http://storage.fluentsearch.ml/123/456',
              createAt: new Date(),
              updateAt: new Date(),
            },

            {
              label: 'test1.jpeg',
              uri: 'http://storage.fluentsearch.ml/123/456',
              uri_thumbnail: 'http://storage.fluentsearch.ml/123/456',
              createAt: new Date(),
              updateAt: new Date(),
            },
          ],
        },
      ],
    };
  }
}
