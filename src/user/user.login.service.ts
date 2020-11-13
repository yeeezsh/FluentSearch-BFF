import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { MongoErrorException } from '../common/exception/mongo-error.exception';
import { UserLoginDto } from './@dtos/user.login.dto';
import { UserDoc } from './@interfaces/user.interface';
import { USER_MODEL } from './constants/user.provider.constant';

@Injectable()
export class UserLoginService {
  constructor(@Inject(USER_MODEL) private readonly userModel: Model<UserDoc>) {}

  //TODO: what type of promise
  async userLogin(login: UserLoginDto) {
    try {
      const user = await this.userModel.findOne({ email: login.email }).lean();
      if (!user) {
        throw new HttpException('email is not exist', HttpStatus.UNAUTHORIZED);
      }
      //FIXME: fix hash.compare
      const auth = await bcrypt.compare(login.password, user.password);
      if (!auth) {
        throw new HttpException('invalid password', HttpStatus.UNAUTHORIZED);
      }
      return user;
    } catch (err) {
      Logger.error(err);
      throw new MongoErrorException(err);
    }
  }
}
