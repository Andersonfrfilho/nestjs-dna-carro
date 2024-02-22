import { dev } from './dev';
import { prod } from './prod';
import { stg } from './stg';

enum EnvironmentConfig {
  dev = 'dev',
  prod = 'prod',
  stg = 'stg',
}

export const ENVIRONMENT_TEST_CONFIG = [
  EnvironmentConfig.dev,
  EnvironmentConfig.stg,
];

export type Config = {
  api: {
    baseUrl: string;
    port: number;
    phone: {
      numberPossibleAttempts: number;
    };
  };
  hash: {
    salt: string;
  };
  sms: {
    accountId: string;
    authToken: string;
    number: string;
  };
  storage: {
    image: {
      profile: {
        name: string;
        keyFileJson: string;
      };
    };
  };
  token: {
    secret: string;
    expireIn: string;
    expireInRefresh: string;
  };
  database: {
    port: number;
    host: string;
    username: string;
    password: string;
    name: string;
  };
  cache: {
    port: number;
    host: string;
    ttl: number;
    password: string;
  };
  maps: {
    apiKey: string;
  };
};

type Configs = {
  [key in EnvironmentConfig]: Config;
};

const configs: Configs = {
  dev: dev(),
  prod: prod(),
  stg: stg(),
};

export const configEnvironment: EnvironmentConfig =
  (process.env.ENVIRONMENT as EnvironmentConfig) || EnvironmentConfig.dev;

console.log('configEnvironment', configEnvironment);
const config: Config = configs[configEnvironment];

export default config;
