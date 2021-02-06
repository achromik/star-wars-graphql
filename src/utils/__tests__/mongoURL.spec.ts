import { DbConfig } from '../../types';
import { mongoURL } from '../mongoURL';

describe('mongoURL', () => {
  it('should return valid URL when proper configuration has been passed', () => {
    const config: DbConfig = {
      dbName: 'starWars',
      dbUser: 'test',
      dbPassword: 'password',
      clusterUrl: 'localhost:9999',
    };

    expect(mongoURL(config)).toEqual(
      'mongodb+srv://test:password@localhost:9999/starWars?retryWrites=true&w=majority'
    );
  });
});
