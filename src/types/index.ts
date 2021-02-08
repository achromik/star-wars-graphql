import { ObjectId } from 'mongodb';
import { Characters } from '../graphql/dataSources/characters';

export type Id = string | mongoose.Types.ObjectId;

export type Environment = {
  apollo: {
    introspection: boolean;
    playground: boolean;
  };
  mongo: {
    url: string;
  };
  isOffline: boolean;
  logStackTrace: boolean;
};

export type DbConfig = {
  dbName: string;
  dbUrl: string;
  dbUser?: string;
  dbPassword?: string;
};

export interface PlanetDocument extends mongoose.Document {
  name: string;
}
