import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { UserLoginInputDTO } from './dtos/user-login.input.dto';
import { UserSessionDTO } from './dtos/user-session.dto';

@Resolver(() => UserSessionDTO)
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation(() => UserSessionDTO)
  async Login(
    @Context('req') req: Request,
    @Context('res') res: Response,
    @Args(UserLoginInputDTO.name) args: UserLoginInputDTO,
  ) {
    return this.authenticationService.userLogin(req, res, args);
  }
}
