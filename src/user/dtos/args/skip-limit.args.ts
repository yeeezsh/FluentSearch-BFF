/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max } from 'class-validator';

@ArgsType()
export class SkipLimitArgs {
  @Field(type => Int)
  skip = 0;

  @Field(type => Int)
  @Max(1000)
  limit = 1000;
}
