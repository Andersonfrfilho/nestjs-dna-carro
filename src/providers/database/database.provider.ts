import databaseSource from './database.source';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = databaseSource;
      return dataSource.initialize();
    },
  },
];
