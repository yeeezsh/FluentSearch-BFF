import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  mainEmail!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(48)
  name!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(48)
  password!: string;
}
