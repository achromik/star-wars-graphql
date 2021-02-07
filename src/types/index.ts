import { ObjectId } from 'mongodb';
import { Characters } from '../graphql/dataSources/characters';

export type Id = string | ObjectId;

export type Planet = {
  id: Id;
  name: string;
};

export type Episode = {
  id: Id;
  name: string;
};

export type Character = {
  id: Id;
  name: string;
  episodes?: Array<Id>;
  planetId?: Id;
};

export type Document = Character | Planet | Episode;

export type MongoDocument = CharacterDocument;

export type CharacterDocument = {
  _id: ObjectId;
  name: string;
  planetId: ObjectId;
};

export type ResolversSource = Character;

export type ResolversContext = {
  dataSources: {
    characters: Characters;
  };
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
  dbUrl: string;
  dbUser?: string;
  dbPassword?: string;
};

export type Renamed<
  T,
  K extends keyof T,
  N extends string | number | symbol
> = Pick<T, Exclude<keyof T, K>> & { [P in N]: T[K] };
