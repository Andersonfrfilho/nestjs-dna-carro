import databaseSource from './database.local.source';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = databaseSource;
      return dataSource.initialize();
    },
  },
];
