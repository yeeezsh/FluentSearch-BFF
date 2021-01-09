import { Field, InputType } from '@nestjs/graphql';
import { UserRegisterInput } from './user-register.input';

@InputType()
export class UserUpdateInput extends UserRegisterInput {
  @Field()
  _id: string;
}
