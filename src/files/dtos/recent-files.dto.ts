import { Field, ObjectType } from '@nestjs/graphql';
import { FileTypeEnum } from 'fluentsearch-types';

@ObjectType()
class RecentFile {
  @Field()
  original_filename: string;

  @Field()
  uri: string;

  @Field()
  uri_thumbnail: string;

  @Field(() => String)
  createAt: Date;

  @Field(() => String)
  updateAt: Date;

  @Field(() => String)
  type: FileTypeEnum;
}

@ObjectType()
export class RecentPreviews {
  @Field(() => String)
  date: Date;

  @Field(() => [RecentFile], { nullable: true })
  files: RecentFile[];
}

@ObjectType()
export class RecentFiles {
  @Field(() => [RecentPreviews])
  result: RecentPreviews[];
}
