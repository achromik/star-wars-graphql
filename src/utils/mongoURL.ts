import { DbConfig } from '../types';

export const mongoURL = (config: DbConfig): string => {
  return `mongodb+srv://${config.dbUser}:${config.dbPassword}${
    config.dbPassword && '@'
  }${config.clusterUrl}/${config.dbName}?retryWrites=true&w=majority`;
};
