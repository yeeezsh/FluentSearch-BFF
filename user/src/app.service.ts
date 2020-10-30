import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRegisterInterface } from './interfaces/userRegister.interface';

@Injectable()
export class UserService {
    private readonly userRepo: UserRegisterInterface[] = []

  async creatUser(create: UserRegisterInterface) {
    this.userRepo.push(create);
  }

  async getAllUser(): Promise<UserRegisterInterface[]> {
    return this.userRepo
  }

}
