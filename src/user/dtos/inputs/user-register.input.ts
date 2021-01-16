import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { User } from '../../models/user.model';

@InputType()
export class UserRegisterInput
  implements Pick<User, 'mainEmail' | 'password' | 'name'> {
  @Field()
  @IsEmail()
  mainEmail: string;

  @Field()
  @MinLength(6)
  @MaxLength(48)
  password: string;

  @Field()
  @MinLength(1)
  @MaxLength(48)
  name: string;
}
