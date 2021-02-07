import { DbConfig } from '../../types';
import { mongoURL } from '../mongoURL';

describe('mongoURL', () => {
  it('should return valid URL for local mongo database', () => {
    const config: DbConfig = {
      dbName: 'starWars',
      dbUser: 'test',
      dbPassword: 'password',
      dbUrl: 'localhost:9999',
    };

    expect(mongoURL(config)).toEqual(
      'mongodb://test:password@localhost:9999/starWars'
    );
  });

  it('should return valid URL for cluster mongo database', () => {
    const config: DbConfig = {
      dbName: 'starWars',
      dbUser: 'test',
      dbPassword: 'password',
      dbUrl: 'cluster.xyz.mongo.atlas.com',
    };

    expect(mongoURL(config)).toEqual(
      'mongodb+srv://test:password@cluster.xyz.mongo.atlas.com/starWars?retryWrites=true&w=majority'
    );
  });

  it('should return valid URL when empty user and password was passed', () => {
    const config: DbConfig = {
      dbName: 'dbTest',
      dbUser: '',
      dbPassword: '',
      dbUrl: 'cluster.xyz.mongo.atlas.com',
    };

    expect(mongoURL(config)).toEqual(
      'mongodb+srv://cluster.xyz.mongo.atlas.com/dbTest?retryWrites=true&w=majority'
    );
  });

  it('should return valid URL when no user and password was passed', () => {
    const config: DbConfig = {
      dbName: 'dbTest',
      dbUrl: 'cluster.xyz.mongo.atlas.com',
    };

    expect(mongoURL(config)).toEqual(
      'mongodb+srv://cluster.xyz.mongo.atlas.com/dbTest?retryWrites=true&w=majority'
    );
  });

  it('should throw an error when empty password was passed', () => {
    const config: DbConfig = {
      dbName: 'dbTest',
      dbUser: 'user',
      dbPassword: '',
      dbUrl: 'cluster.xyz.mongo.atlas.com',
    };

    expect(() => mongoURL(config)).toThrowError('Missing username or password');
  });

  it('should throw an error when no username was passed', () => {
    const config: DbConfig = {
      dbName: 'dbTest',
      dbPassword: 'password',
      dbUrl: 'cluster.xyz.mongo.atlas.com',
    };

    expect(() => mongoURL(config)).toThrowError('Missing username or password');
  });

  it('should throw an error when empty database was passed', () => {
    const config: DbConfig = {
      dbName: '',
      dbUser: 'test',
      dbPassword: 'password',
      dbUrl: 'localhost',
    };

    expect(() => mongoURL(config)).toThrowError('Missing database name');
  });

  it('should throw an error when empty database url was passed', () => {
    const config: DbConfig = {
      dbName: 'testDb',
      dbUser: 'test',
      dbPassword: 'password',
      dbUrl: '',
    };

    expect(() => mongoURL(config)).toThrowError('Missing database url');
  });
});
