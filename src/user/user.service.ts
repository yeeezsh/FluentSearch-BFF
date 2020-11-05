import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { USER_MODEL } from './constants/user.provider.constant';
import { UserDoc } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@Inject(USER_MODEL) private readonly userModel: Model<UserDoc>) {}

  async create() {
    try {
      const doc = new this.userModel();
      doc.save();
    } catch (err) {
      throw err;
    }
  }
}
