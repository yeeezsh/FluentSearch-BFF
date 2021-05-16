import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserSessionDto } from 'fluentsearch-types';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req as Request;
    const token = req.cookies.Authorization || req.headers.Authorization;

    if (!token) return false;

    const extractToken = token.replace('Bearer ', '');
    const { _id } = this.jwtService.verify(extractToken, {
      secret: this.configService.get().jwt.secretKey,
      ignoreExpiration: false,
    }) as Pick<UserSessionDto, '_id'>;
    const valid = !!_id;
    return valid;
  }
}
