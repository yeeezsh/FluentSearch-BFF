export type ConfigAppProviderType = {
  database: {
    connection: string;
    username: string;
    password: string;
    authSource: string;
  };
  jwt: {
    secretKey: string;
    expires: string;
  };
  opsKey: string;
  node_env: 'production' | 'development';
  origin: RegExp;
  bcrypt: {
    round: number;
  };
  port: number;
};