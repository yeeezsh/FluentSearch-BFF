import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'test@mail.com' })
  @IsString()
  mainEmail!: string;

  @IsNotEmpty({ message: 'test' })
  @IsString()
  name!: string;

  @IsNotEmpty()
  password!: string;
}
