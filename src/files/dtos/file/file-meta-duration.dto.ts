import { Field, ObjectType } from '@nestjs/graphql';
import { VideoMeta } from 'fluentsearch-types';

type VideoDurationType = VideoMeta['duration'];

@ObjectType()
export class FileDurationMetaDTO implements VideoDurationType {
  @Field()
  original: string;

  @Field()
  hour: number;

  @Field()
  minute: number;

  @Field()
  second: number;
}
