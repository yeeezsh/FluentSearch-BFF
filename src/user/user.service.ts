import { Inject, Injectable, Logger } from '@nestjs/common';
import { genSalt, hash } from 'bcryptjs';
import { Model, Types } from 'mongoose';
import { MongoErrorException } from '../common/exception/mongo-error.exception';
import { APP_CONFIG } from '../config/config.constant';
import { ConfigurationInterface } from '../config/config.interface';
import { UserQuery, UsersQuery } from './@types/user.query.types';
import { USER_MODEL } from './constants/user.provider.constant';
import { CreateUserDto } from './dtos/user.dto';
import { User, UserDoc } from './interfaces/user.interface';
import { UserPackageEnum } from './schemas/enums/user-package.enum';
import { UserRoleEnum } from './schemas/enums/user-role.enum';
import { UserZoneEnum } from './schemas/enums/user.zone.enum';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL) private readonly userModel: Model<UserDoc>,
    @Inject(APP_CONFIG) private readonly appConfig: ConfigurationInterface,
  ) {}

  async findById(id: Types.ObjectId): Promise<UserQuery | null> {
    try {
      return this.userModel
        .findById(id)
        .select({ password: 0 })
        .lean();
    } catch (err) {
      Logger.error(err);
      throw new MongoErrorException(err);
    }
  }

  async getUsers(skip = 0, limit = 1000): Promise<UsersQuery> {
    try {
      return this.userModel
        .find({})
        .select({ password: 0 })
        .skip(skip)
        .limit(limit)
        .lean();
    } catch (err) {
      Logger.error(err);
      throw new MongoErrorException(err);
    }
  }

  async getUser(id: string): Promise<Omit<User, 'password'>> {
    try {
      return this.userModel
        .find({ _id: id })
        .select({ password: 0 })

        .lean();
    } catch (err) {
      Logger.error(err);
      throw new MongoErrorException(err);
    }
  }

  async createUser(payload: CreateUserDto): Promise<UserDoc> {
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

    try {
      const doc = new this.userModel(user);
      const saved = await doc.save();
      return saved;
    } catch (err) {
      Logger.error(err);
      throw new MongoErrorException(err);
    }
  }
}
