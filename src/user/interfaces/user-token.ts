import { OAuthProviderEnum } from 'fluentsearch-types';

export interface IUserToken {
  provider: OAuthProviderEnum;
  token: string;
}
