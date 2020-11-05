import { OAuthProviderEnum } from '../schemas/enums/provider.enum';

export interface UserToken {
  provider: OAuthProviderEnum;
  token: string;
}
