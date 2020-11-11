import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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

  async createUser(create: CreateUserDto): Promise<UserDoc> {
    const check = await Promise.all([
      this.userModel.findOne({ email: create.email }),
    ]);
    const valid = check.filter(e => e);
    if (valid.length !== 0) {
      throw new HttpException('email is duplicated', HttpStatus.BAD_REQUEST);
    }

    const user: User = {
      ...create,
      password: await hash(create.password, 'verystrongsalt@123'),
      oauth: [],
      role: UserRoleEnum.user,
      package: UserPackageEnum.freeUser,

      createDate: new Date(),
      updateDate: new Date(),
    };

    const doc = new this.userModel(user);
    const saved = await doc.save();
    return saved;
  }
}
