import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class RecentFile {
  @Field()
  label: string;

  @Field()
  uri: string;

  @Field()
  uri_thumbnail: string;

  @Field(() => String)
  createAt: Date;

  @Field(() => String)
  updateAt: Date;
}

@ObjectType()
class RecentPreviews {
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
