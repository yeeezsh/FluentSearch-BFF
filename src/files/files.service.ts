import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileDocument, FILES_SCHEMA_NAME } from 'fluentsearch-types';
import { Model } from 'mongoose';
import { ConfigService } from '../config/config.service';
import { RecentPreviews } from './dtos/recent-files.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(FILES_SCHEMA_NAME)
    private readonly userModel: Model<FileDocument>,
    private readonly configService: ConfigService,
  ) {}

  async getRecentFilesByUser(userId: string, skip: number, limit: number) {
    return this.userModel
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
                '/',
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
