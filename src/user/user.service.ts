import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { USER_MODEL } from './constants/user.provider.constant';
import { CreateUserDto } from './dtos/user.dto';
import { UserDoc } from './interfaces/user.interface';
import { RoleEnum } from './schemas/enums/role.enum';

@Injectable()
export class UserService {
  constructor(@Inject(USER_MODEL) private readonly userModel: Model<UserDoc>) {}

  async getAllUser() {
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

    //-----[Note: Question] init role and oauth password
    const temp = {
      ...create,
      role: RoleEnum.freeUser,
      //password: await Hash.encrypt(create.password),
    };

    const doc = new this.userModel(temp);
    const saved = await doc.save();
    return saved;
  }

  // async create() {
  //   try {
  //     const doc = new this.userModel();
  //     doc.save();
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}
