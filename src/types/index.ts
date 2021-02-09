import mongoose from 'mongoose';

export type Id = string | mongoose.Types.ObjectId;

export type Environment = {
  apollo: ApolloOpts;
  mongo: MongoOpts;
  graphQL: GraphQLOpts;
  isOffline: boolean;
  logStackTrace: boolean;
};

type ApolloOpts = {
  introspection: boolean;
  playground: boolean;
};

type MongoOpts = {
  url: string;
};

type GraphQLOpts = {
  removeFields: string[];
  pageSize?: number;
};

export type DbConfig = {
  dbName: string;
  dbUrl: string;
  dbUser?: string;
  dbPassword?: string;
};

export interface CharacterDocument extends mongoose.Document {
  name: string;
  planetId: Id;
}

export interface PlanetDocument extends mongoose.Document {
  name: string;
  population: number;
  moons: number;
}

export type CharacterInput = { name: string; planetId?: Id };

export interface PlanetDocument extends mongoose.Document {
  name: string;
}

export type TypeComposerOpts = {
  fields?: {
    remove?: string[];
  };
};

export type Context = {
  Character: mongoose.Model<CharacterDocument>;
  Planet: mongoose.Model<PlanetDocument>;
};

export type MutationArgs = CharacterInput;
