import { Field, ObjectType } from '@nestjs/graphql';
import { BaseFileMetaSchema } from 'fluentsearch-types';
import { FileDurationMetaDTO } from './file-meta-duration.dto';

@ObjectType()
export class FileMetaDTO implements BaseFileMetaSchema<Record<string, any>> {
  @Field()
  size: number;

  @Field()
  width: number;

  @Field()
  height: number;

  @Field()
  extension: string;

  @Field()
  contentType: string;

  @Field(() => String, { nullable: true })
  sha1?: string;

  //   video meta

  @Field(() => Number, { nullable: true })
  fps: number;

  @Field(() => String, { nullable: true })
  codec: string;

  @Field(() => Number, { nullable: true })
  bitrate: number;

  @Field(() => FileDurationMetaDTO, { nullable: true })
  duration: FileDurationMetaDTO;
}
