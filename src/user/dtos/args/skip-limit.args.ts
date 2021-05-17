/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max } from 'class-validator';

@ArgsType()
export class SkipLimitArgs {
  @Field(() => Int, { nullable: false })
  skip = 0;

  @Field(() => Int, { nullable: false })
  @Max(1000)
  limit = 1000;
}
