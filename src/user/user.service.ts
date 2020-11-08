import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { USER_MODEL } from './constants/user.provider.constant';
import { CreateUserDto } from './dtos/user.dto';
import { UserDoc } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@Inject(USER_MODEL) private readonly userModel: Model<UserDoc>) {}

  async creatUser(create: CreateUserDto): Promise<UserDoc> {
    const check = await Promise.all([
      this.userModel.findOne({ email: create.email }),
    ]);
    const valid = check.filter(e => e);
    if (valid.length !== 0) {
      throw new HttpException('email is duplicated', HttpStatus.BAD_REQUEST);
    }

    const doc = new this.userModel(create);
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
