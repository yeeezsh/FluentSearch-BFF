import { Args, Query, Resolver } from '@nestjs/graphql';
import { ConfigService } from '../config/config.service';
import { SkipLimitArgs } from '../user/dtos/args/skip-limit.args';
import { RecentFiles } from './dtos/recent-files.dto';

@Resolver()
export class FilesResolver {
  constructor(private readonly configService: ConfigService) {}
  @Query(() => RecentFiles)
  async GetRecentFiles(@Args() skipLimit: SkipLimitArgs): Promise<RecentFiles> {
    const genUri = () =>
      `http://${this.configService.get().storage_endpoint}/${Math.random()
        .toPrecision(4)
        .slice(4)}/${Math.random()
        .toPrecision(8)
        .slice(2)}`;
    return {
      result: [
        {
          date: new Date(),
          files: [
            {
              label: 'test.jpeg',
            },
            {
              label: 'test1.jpeg',
            },
            {
              label: 'test2.jpeg',
            },
          ].map(el => ({
            ...el,
            uri_thumbnail: genUri(),
            uri: genUri(),
            createAt: new Date(),
            updateAt: new Date(),
          })),
        },
        {
          date: new Date('01/01/1999'),
          files: [
            {
              label: 'testx.jpeg',
            },
            {
              label: 'testy.jpeg',
            },
            {
              label: 'testz.jpeg',
            },
          ].map(el => ({
            ...el,
            uri_thumbnail: genUri(),
            uri: genUri(),
            createAt: new Date(),
            updateAt: new Date(),
          })),
        },
      ],
    };
  }
}
