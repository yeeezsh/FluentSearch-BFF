import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { USER_MODEL } from './constants/user.provider.constant';
import { CreateUserDto } from './dtos/user.dto';
import { User, UserDoc } from './interfaces/user.interface';
import { UserRoleEnum } from './schemas/enums/user-role.enum';

@Injectable()
export class UserService {
  constructor(@Inject(USER_MODEL) private readonly userModel: Model<UserDoc>) {}

  findOne(_id: string) {
    throw new Error('Method not implemented.');
  }

  async getUsers(skip = 0, limit = 1000): Promise<UserDoc[]> {
    return this.userModel
      .find({})
      .skip(skip)
      .limit(limit);
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
      role: UserRoleEnum.user,
      password: await hash(create.password, 'verystrongsalt@123'),
      createDate: new Date(),
      updateDate: new Date(),
      oauth: [],
    };

    const doc = new this.userModel(user);
    const saved = await doc.save();
    return saved;
  }
}
