import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileDocument, FILES_SCHEMA_NAME } from 'fluentsearch-types';
import { LeanDocument, Model } from 'mongoose';
import { FileNotExisistException } from '../common/exception/file-not-exists-exception';
import { InvalidUserAccessException } from '../common/exception/invalid-user-access.exception';
import { ConfigService } from '../config/config.service';
import { RecentPreviews } from './dtos/recent-files.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(FILES_SCHEMA_NAME)
    private readonly fileModel: Model<FileDocument>,
    private readonly configService: ConfigService,
  ) {}

  async getFile(
    fileId: string,
    owner: string,
  ): Promise<LeanDocument<FileDocument>> {
    const file = await this.fileModel.findById(fileId).lean();
    if (!file) throw new FileNotExisistException();
    if (file.owner !== owner) throw new InvalidUserAccessException();
    return file;
  }

  async getRecentFilesByUser(userId: string, skip: number, limit: number) {
    return this.fileModel
      .aggregate<RecentPreviews>([
        { $match: { owner: userId } },
        { $sort: { createAt: -1 } },
        { $skip: skip },
        { $limit: limit },

        //   file
        {
          $addFields: {
            uri: {
              $concat: [
                `http://${this.configService.get().storage_endpoint}/`,
                '$owner',
                '/',
                {
                  $toString: '$_id',
                },
              ],
            },
            uri_thumbnail: {
              $concat: [
                `http://${this.configService.get().storage_endpoint}/`,
                '$owner',
                '/thumbnail',
                {
                  $toString: '$_id',
                },
              ],
            },
          },
        },

        //   select
        {
          $project: {
            _id: 1,
            owner: 1,
            original_filename: 1,
            uri: 1,
            uri_thumbnail: 1,
            createAt: 1,
            updateAt: 1,
          },
        },

        //   group to date
        {
          $addFields: {
            date: { $dateToString: { format: '%d-%m-%Y', date: '$createAt' } },
          },
        },
        {
          $group: {
            _id: '$date',

            files: { $push: '$$ROOT' },
          },
        },
        {
          $addFields: {
            date: '$_id',
          },
        },
      ])
      .allowDiskUse(true);
  }
}
