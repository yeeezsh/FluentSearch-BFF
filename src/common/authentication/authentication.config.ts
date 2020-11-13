import { Inject } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { APP_CONFIG } from '../../config/config.constant';
import { ConfigurationInterface } from '../../config/config.interface';

export class AuthenticationConfig implements JwtOptionsFactory {
  constructor(
    @Inject(APP_CONFIG) private readonly config: ConfigurationInterface,
  ) {}
  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      secret: this.config.jwt.secretKey,
      signOptions: {
        expiresIn: this.config.jwt.expires,
      },
    };
  }
}
