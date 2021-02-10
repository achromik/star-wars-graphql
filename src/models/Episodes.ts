import {
  composeMongoose,
  PaginationResolverOpts,
} from 'graphql-compose-mongoose';
import mongoose, { Schema } from 'mongoose';

import { environment } from '../environment';
import {
  getCharacterEpisodesQuery,
  getCharacterEpisodesNameQuery,
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

EpisodeTC.addRelation('characters', {
  resolver: () => CharacterTC.mongooseResolvers.findByIds(),
  prepareArgs: {
    _ids: (source) => source.charactersIds,
  },
  projection: { charactersIds: true },
});

EpisodeTC.addResolver({
  name: 'getCharacterEpisodes',
  type: [EpisodeTC],
  resolve: getCharacterEpisodesQuery,
  args: {
    id: 'MongoID!',
  },
});

EpisodeTC.addResolver({
  name: 'getCharacterEpisodesName',
  type: '[String]',
  resolve: getCharacterEpisodesNameQuery,
  args: {
    id: 'MongoID!',
  },
});

const paginationOptions: PaginationResolverOpts = {
  perPage: environment.graphQL.pageSize,
};

export const episodesQuery = {
  getAllEpisodes: EpisodeTC.mongooseResolvers
    .pagination(paginationOptions)
    .wrapResolve((next) => (rp) => {
      rp.projection = { ...rp.projection, charactersIds: true };
      return next(rp);
    }),
  getCharacterEpisodes: EpisodeTC.getResolver('getCharacterEpisodes'),
};
