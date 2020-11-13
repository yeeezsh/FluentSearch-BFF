import { OAuthProviderEnum } from '../schemas/enums/oauth-provider.enum';

export interface UserToken {
  provider: OAuthProviderEnum;
  token: string;
}
