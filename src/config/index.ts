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
    port: number;
    phone: {
      numberPossibleAttempts: number;
    };
  };
  sms: {
    accountId: string;
    authToken: string;
    number: string;
  };
  token: {
    secret: string;
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

const config: Config = configs[configEnvironment];

export default config;
