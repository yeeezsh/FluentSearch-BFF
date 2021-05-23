import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  BaseFileMetaSchema,
  BaseFileSchema,
  FileTypeEnum,
  ZoneEnum,
} from 'fluentsearch-types';
import { FileMetaDTO } from './file-meta.dto';

registerEnumType(FileTypeEnum, { name: 'FileTypeEnum' });
registerEnumType(ZoneEnum, { name: 'ZoneEnum' });

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
