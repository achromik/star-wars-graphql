import { mongoURL } from './utils';
import { DbConfig, Environment } from './types';

const databaseConfig: DbConfig = {
  dbName: process.env.DB_NAME || 'starWars',
  dbUser: process.env.DB_USER || '',
  dbPassword: process.env.DB_PASSWORD || '',
  dbUrl: process.env.MONGO_URL || 'localhost:27017',
};

export const environment: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION?.toLowerCase() === 'true',
    playground:
      process.env.APOLLO_PLAYGROUND?.toLowerCase() === 'true' ||
      process.env.IS_OFFLINE?.toLowerCase() === 'true',
  },
  mongo: {
    url: mongoURL(databaseConfig),
  },
  graphQL: {
    removeFields: ['createdAt', 'updatedAt', '_id', '__v'],
    pageSize: parseInt(process.env.PAGE_SIZE as string, 10) || undefined,
  },
  isOffline: process.env.IS_OFFLINE?.toLowerCase() === 'true',
  logStackTrace: process.env.LOG_STACK_TRACE?.toLowerCase() === 'true',
};
