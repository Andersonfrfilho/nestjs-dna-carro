import { DataSource } from 'typeorm';
import config from '../../config';

const devEnvironment = !!(
  process.env.ENVIRONMENT === 'dev' || process.env.ENVIRONMENT === ''
);
const entities = process.env.TYPEORM_INTERNAL
  ? [`dist/**/*.entity{.ts,.js}`, `src/**/*.entity{.ts,.js}`]
  : [`dist/**/*.entity{.ts,.js}`];
const migrations = process.env.TYPEORM_INTERNAL
  ? [
      `./dist/providers/database/migrations/*{.js}`,
      `./src/providers/database/migrations/*{.ts,.js}`,
    ]
  : [`./dist/providers/database/migrations/*{.js}`];

export default new DataSource({
  type: 'postgres',
  host: config.database.host || 'localhost',
  port: config.database.port || 5432,
  username: config.database.username || 'dna_carro',
  password: config.database.password || '102030',
  database: config.database.name || 'dna_carro',
  logging: devEnvironment || false,
  entities,
  migrations,
});
