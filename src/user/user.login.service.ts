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
import { UserQuery } from './@types/user.query.types';
import { USER_MODEL } from './constants/user.provider.constant';

@Injectable()
export class UserLoginService {
  constructor(@Inject(USER_MODEL) private readonly userModel: Model<UserDoc>) {}

  async userLogin(login: UserLoginDto): Promise<UserQuery | null> {
    try {
      const user = await this.userModel
        .findOne({ email: login.email })
        .select({ password: 0 })
        .lean();
      if (!user) {
        throw new HttpException('email is not exist', HttpStatus.UNAUTHORIZED);
      }
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
