import { DbConfig } from '../types';

export const mongoURL = (config: DbConfig): string => {
  const { dbName, dbUrl, dbUser, dbPassword } = config;

  if (!dbName) {
    throw new Error('Missing database name');
  }

  if (!dbUrl) {
    throw new Error('Missing database url');
  }

  if (
    (dbPassword && (!dbUser || typeof dbUser === 'undefined')) ||
    (dbUser && (!dbPassword || typeof dbPassword === 'undefined'))
  ) {
    throw new Error('Missing username or password');
  }

  const userData = dbUser && dbPassword ? `${dbUser}:${dbPassword}@` : '';

  const isLocalDb = dbUrl.match(/localhost/i);

  const prefix = isLocalDb ? 'mongodb' : 'mongodb+srv';
  const suffix = !isLocalDb ? '?retryWrites=true&w=majority' : '';

  return `${prefix}://${userData}${dbUrl}/${dbName}${suffix}`;
};
