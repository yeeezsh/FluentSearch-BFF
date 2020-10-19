import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './CreateUserDto.dto';

@Injectable()
export class UserService {
  getHello(): CreateUserDto {
    const cat = {
      "name": "cat",
      "age": 10,
      "breed": "milk"
    }
    return cat;
  }
}
