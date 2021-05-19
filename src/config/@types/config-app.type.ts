export type ConfigAppProviderType = {
  hostname: string;
  main_hostname: string;
  database: {
    connection: string;
    username: string;
    password: string;
    authSource: string;
  };
  jwt: {
    secretKey: string;
    expires: number;
  };
  opsKey: string;
  node_env: 'production' | 'development';
  origin: RegExp;
  bcrypt: {
    round: number;
  };
  port: number;
  session: {
    secret: string;
    expires: number;
  };
  storage_endpoint: string;
  minio: {
    endpoint: string;
    access_key: string;
    secret_key: string;
    port: number;
    ssl: boolean;
  };
};
