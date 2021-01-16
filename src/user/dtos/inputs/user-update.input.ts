import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator';
import { UserRegisterInput } from './user-register.input';

@InputType()
export class UserUpdateInput implements UserRegisterInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  mainEmail: string;

  @Field({ nullable: true })
  @MinLength(6)
  @MaxLength(48)
  @IsOptional()
  password: string;

  @Field({ nullable: true })
  @MinLength(1)
  @MaxLength(48)
  @IsOptional()
  name: string;
}
