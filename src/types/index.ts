import { ObjectId } from 'mongodb';

export type Id = string | ObjectId;

export type Planet = {
  id: Id;
  name?: string;
};

export type Episode = {
  id: Id;
  name?: string;
};

export type Character = {
  id: Id;
  name?: string;
  episodes?: Array<Id>;
  planetId?: Id;
};

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
  dbUser: string;
  dbPassword: string;
  clusterUrl: string;
};
