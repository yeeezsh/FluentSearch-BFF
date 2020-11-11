import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'test' })
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string[];

  @IsNotEmpty()
  password!: string;
}
