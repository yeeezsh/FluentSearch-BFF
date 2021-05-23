import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  BaseFileMetaSchema,
  BaseFileSchema,
  FileTypeEnum,
  VideoMeta,
  ZoneEnum,
} from 'fluentsearch-types';

registerEnumType(FileTypeEnum, { name: 'FileTypeEnum' });
registerEnumType(ZoneEnum, { name: 'ZoneEnum' });
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

@ObjectType()
export class FileModelDTO
  implements
    BaseFileSchema<
      FileTypeEnum.Image | FileTypeEnum.ImageThumbnail | FileTypeEnum.Video,
      Record<string, any>
    > {
  @Field()
  _id: string;

  @Field()
  uri: string;

  @Field(() => FileMetaDTO)
  meta: BaseFileMetaSchema<Record<string, any>>;

  @Field()
  owner: string;

  @Field(() => ZoneEnum)
  zone: ZoneEnum;

  @Field()
  original_filename: string;

  @Field(() => FileTypeEnum)
  type: FileTypeEnum.Image | FileTypeEnum.Video | FileTypeEnum.ImageThumbnail;

  @Field(() => String)
  createAt: Date;

  @Field(() => String)
  updateAt: Date;
}
