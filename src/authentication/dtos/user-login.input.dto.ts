import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class UserLoginInputDTO {
  @Field()
  @IsString()
  @MinLength(6)
  @MaxLength(40)
  password: string;

  @Field()
  @IsEmail()
  email: string;
}
