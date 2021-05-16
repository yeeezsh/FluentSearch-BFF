import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { AuthenticationService } from './authentication.service';
import { UserLoginInputDTO } from './dtos/user-login.input.dto';
import { UserSessionDTO } from './dtos/user-session.dto';

@Resolver(() => UserSessionDTO)
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation(() => UserSessionDTO)
  async Login(
    @Context('req') req: Request,
    @Args(UserLoginInputDTO.name) args: UserLoginInputDTO,
  ) {
    return this.authenticationService.userLogin(req, args);
  }

  @Mutation(() => String, { nullable: true })
  async Logout(@Context('req') req: Request) {
    req.session.destroy(() => ({}));
    return 'logged out';
  }

  @Mutation(() => String, { nullable: true })
  async RefreshToken(@Context('req') req: Request) {
    return this.authenticationService.refreshToken(req);
  }
}
