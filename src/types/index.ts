import mongoose from 'mongoose';

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
  removeFields: string[];
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
}

export type TypeComposerOpts = {
  fields?: {
    remove?: string[];
  };
};
