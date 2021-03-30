import { ConfigEnvEnum } from './@types/config.env.enum';

export type ProcessConfigType = {
  [key in ConfigEnvEnum]: string;
};
