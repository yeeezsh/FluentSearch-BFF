import { Field, Int, ObjectType, Query, Resolver } from '@nestjs/graphql';

@ObjectType()
export class AppModel {
  @Field(() => Int)
  status!: number;
}

@Resolver(() => AppModel)
export class AppResolver {
  @Query(() => AppModel)
  async serverStatus() {
    return { status: 200 };
  }
}
