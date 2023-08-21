const devEnvironment = !!(
  process.env.ENVIRONMENT === 'development' || process.env.ENVIRONMENT === ''
);

const ormConfig = {
  type: 'postgres',
  host: process.env.DATABASE_HOST ?? ' dna-carro-database',
  port: Number(process.env.DATABASE_PORT) ?? 5432,
  username: process.env.DATABASE_USERNAME ?? 'dna_carro',
  password: process.env.DATABASE_PASSWORD ?? '102030',
  database: process.env.DATABASE_NAME ?? 'dna_carro',
  logging: devEnvironment ?? false,
  synchronize: false,
  migrationsRun: false,
  entities: [`dist/**/*.entity{.ts,.js}`],
  migrations: [`dist/src/providers/database/migrations/*{.ts,.js}`],
};

export default ormConfig;
