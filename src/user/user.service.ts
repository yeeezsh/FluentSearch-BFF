import { Inject, Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcryptjs';
import { Model, Types } from 'mongoose';
import { UserNotExistsException } from '../common/exception/user-not-exists.exception';
import { APP_CONFIG } from '../config/config.constant';
import { ConfigurationInterface } from '../config/config.interface';
import { USER_MODEL } from './constants/user.provider.constant';
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
    @Inject(USER_MODEL) private readonly userModel: Model<UserDocument>,
    @Inject(APP_CONFIG) private readonly appConfig: ConfigurationInterface,
  ) {}

  async findById(id: Types.ObjectId): Promise<UserQueryReturns> {
    return this.userModel
      .findById(id)
      .select({ password: 0 })
      .lean();
  }

  async getUsers(skip = 0, limit = 1000): Promise<UsersQueryReturns> {
    return this.userModel
      .find({})
      .select({ password: 0 })
      .skip(skip)
      .limit(limit)
      .lean();
  }

  async getUser(id: string): Promise<UserQueryReturns> {
    return this.userModel
      .findById(id)
      .select({ password: 0 })
      .lean();
  }

  async createUser(payload: UserRegisterInput): Promise<UserDocument> {
    const { round } = this.appConfig.bcrypt;
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
    const saved = await doc.save();
    return saved;
  }

  async updateUser(payload: UserUpdateInput): Promise<UserDocument> {
    const updatePayload = { ...payload, _id: null };
    const user = await this.userModel.findByIdAndUpdate(payload.id, {
      parsePayload: updatePayload,
    });
    if (!user) throw new UserNotExistsException();

    return user;
  }
}
