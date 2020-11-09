import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { USER_MODEL } from './constants/user.provider.constant';
import { CreateUserDto } from './dtos/user.dto';
import { UserLoginDto } from './dtos/user.login.dto';
import { User, UserDoc } from './interfaces/user.interface';
import { RoleEnum } from './schemas/enums/role.enum';

@Injectable()
export class UserService {
  constructor(@Inject(USER_MODEL) private readonly userModel: Model<UserDoc>) {}

  async getAllUser(): Promise<UserDoc[]> {
    const doc = {};
    const all = await this.userModel.find(doc);
    return all;
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
      role: RoleEnum.freeUser,
      password: await hash(create.password, 'verystrongsalt@123'),
      createDate: new Date(),
      updateDate: new Date(),
      oauth: [],
    };

    const doc = new this.userModel(user);
    const saved = await doc.save();
    return saved;
  }

  async loginUser(login: UserLoginDto) {}

  // async create() {
  //   try {
  //     const doc = new this.userModel();
  //     doc.save();
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}
