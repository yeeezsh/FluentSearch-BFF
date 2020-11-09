import { ConfigEnum } from './config.enum';

export type ProcessConfigType = {
  [key in ConfigEnum]: string;
};
