import { OAuthProviderEnum } from '../schemas/enums/oauth-provider.enum';

export interface IUserToken {
  provider: OAuthProviderEnum;
  token: string;
}
