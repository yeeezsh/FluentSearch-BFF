import { Inject, Injectable, Logger } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { UsersQuery } from './@types/user.query.types';
import { USER_MODEL } from './constants/user.provider.constant';
import { CreateUserDto } from './dtos/user.dto';
import { User, UserDoc } from './interfaces/user.interface';
import { UserPackageEnum } from './schemas/enums/user-package.enum';
import { UserRoleEnum } from './schemas/enums/user-role.enum';

@Injectable()
export class UserService {
  constructor(@Inject(USER_MODEL) private readonly userModel: Model<UserDoc>) {}

  async findOne(id: string): Promise<UsersQuery | null> {
    return this.userModel
      .findById(id)
      .select({ password: -1 })
      .lean();
  }

  async getUsers(skip = 0, limit = 1000): Promise<UsersQuery> {
    return this.userModel
      .find({})
      .select({ password: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
  }

  async createUser(payload: CreateUserDto): Promise<UserDoc> {
    const user: User = {
      ...payload,
      email: [payload.mainEmail],
      //TODO: use from config module
      //TODO: fix hash password
      // password: await hash(payload.password, 'VeryStrongSalt@1234567890!'),
      password: payload.password,
      oauth: [],
      role: UserRoleEnum.user,
      package: UserPackageEnum.freeUser,

      createDate: new Date(),
      updateDate: new Date(),
    };

    try {
      const doc = new this.userModel(user);
      const saved = await doc.save();
      return saved;
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }
}
