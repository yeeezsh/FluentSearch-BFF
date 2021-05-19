import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcryptjs';
import { LeanDocument, Model } from 'mongoose';
import { MinioService } from 'nestjs-minio-client';
import { UserNotExistsException } from '../common/exception/user.not-exists.exception';
import { ConfigService } from '../config/config.service';
import { UserRegisterInput } from './dtos/inputs/user-register.input';
import { UserUpdateInput } from './dtos/inputs/user-update.input';
import {
  UserQueryReturns,
  UsersQueryReturns,
} from './models/user-query-returns.model';
import { User } from './models/user.model';
import { UserPackageEnum } from './schemas/enums/user-package.enum';
import { UserRoleEnum } from './schemas/enums/user-role.enum';
import { UserZoneEnum } from './schemas/enums/user.zone.enum';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
    private readonly minioClient: MinioService,
  ) {}

  async getUsers(skip = 0, limit = 1000): Promise<UsersQueryReturns> {
    return this.userModel
      .find({})
      .select({ password: 0 })
      .skip(skip)
      .limit(limit)
      .lean();
  }

  async getById(id: string): Promise<UserQueryReturns> {
    return this.userModel
      .findById(id)
      .select({ password: 0 })
      .lean();
  }

  async createUser(payload: UserRegisterInput): Promise<UserDocument> {
    const { round } = this.configService.get().bcrypt;
    const salt = await genSalt(round);
    const user: User = {
      ...payload,
      email: [payload.mainEmail],
      password: await hash(payload.password, salt),
      oauth: [],

      role: UserRoleEnum.user,
      package: UserPackageEnum.freeUser,

      // meta
      zone: UserZoneEnum.TH1,
      createDate: new Date(),
      updateDate: new Date(),
    };

    const doc = new this.userModel(user);
    await this.createBucket(doc._id);
    return doc.save();
  }

  async updateUser(payload: UserUpdateInput): Promise<UserDocument> {
    const updatePayload = { ...payload, id: undefined, password: undefined };
    const user = await this.userModel.findByIdAndUpdate(
      payload.id,
      updatePayload,
      {
        new: true,
      },
    );
    if (!user) throw new UserNotExistsException();
    return user;
  }

  async getUserByEmail(email: string): Promise<LeanDocument<UserDocument>> {
    const user = await this.userModel.findOne({ mainEmail: email }).lean();
    if (!user) throw new UserNotExistsException();
    return user;
  }

  private async createBucket(id: string): Promise<void> {
    try {
      await this.minioClient.client.makeBucket(`${id}`, UserZoneEnum.TH1);
    } catch (err) {
      Logger.error(err);
      throw err;
    }
    return;
  }
}
