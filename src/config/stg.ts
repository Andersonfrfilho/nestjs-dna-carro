import { Config } from '.';

export const stg = (): Config => ({
  api: {
    port: parseInt(process.env.PORT ?? '', 10) || 3333,
    phone: {
      numberPossibleAttempts:
        parseInt(process.env.SMS_ACCOUNT_ID ?? '', 10) ?? 3,
    },
  },
  token: {
    secret: process.env.TOKEN_SECRET ?? '',
  },
  storage: {
    image: {
      profile: {
        name: process.env.STORAGE_IMAGE_PROFILE_BUCKET_NAME ?? '',
        keyFileJson: process.env.STORAGE_IMAGE_PROFILE_PATH_KEY_JSON ?? '',
      },
    },
  },
  sms: {
    accountId: process.env.SMS_ACCOUNT_ID ?? '',
    authToken: process.env.SMS_AUTH_TOKEN ?? '',
    number: process.env.SMS_NUMBER ?? '',
  },
  database: {
    port: parseInt(process.env.DATABASE_PORT ?? '', 10) || 5432,
    host: process.env.DATABASE_HOST ?? '',
    username: process.env.DATABASE_USERNAME ?? '',
    password: process.env.DATABASE_PASSWORD ?? '',
    name: process.env.DATABASE_NAME ?? '',
  },
  cache: {
    host: process.env.CACHE_HOST ?? 'dna-carro-cache',
    port: parseInt(process.env.CACHE_PORT ?? '6379'),
    password: process.env.CACHE_PASSWORD ?? '102030',
    ttl: parseInt(process.env.CACHE_TTL ?? '0'),
  },
  maps: {
    apiKey: process.env.MAPS_API_KEY ?? '',
  },
});
