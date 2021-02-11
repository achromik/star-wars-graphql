import { composeMongoose } from 'graphql-compose-mongoose';
import mongoose, { Schema } from 'mongoose';

import { environment } from '../environment';
import {
  getCharacterEpisodesQuery,
  getCharacterEpisodesNameQuery,
  charactersField,
} from '../resolvers/episodes';
import { EpisodeDocument, TypeComposerOpts } from '../types';
import { Character, CharacterTC } from './Characters';

const episodeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
  },
  episodeNo: {
    type: Number,
  },
  charactersIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Character,
    },
  ],
});

export const Episode = mongoose.model<EpisodeDocument>(
  'Episode',
  episodeSchema,
  'episodes'
);

const customizationOptions: TypeComposerOpts = {
  fields: {
    remove: [...environment.graphQL.removeFields],
  },
};

export const EpisodeTC = composeMongoose(Episode, customizationOptions);

EpisodeTC.addFields({
  characters: {
    type: () => [CharacterTC],
    resolve: charactersField,
    projection: { charactersIds: true, planetId: true },
  },
});

EpisodeTC.addResolver({
  name: 'getCharacterEpisodes',
  type: [EpisodeTC],
  resolve: getCharacterEpisodesQuery,
  args: {
    id: 'MongoID!',
  },
  projection: { planetId: true },
});

EpisodeTC.addResolver({
  name: 'getCharacterEpisodesName',
  type: '[String]',
  resolve: getCharacterEpisodesNameQuery,
  args: {
    id: 'MongoID!',
  },
  projection: { planetId: true },
});
