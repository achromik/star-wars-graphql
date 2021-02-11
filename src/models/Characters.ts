import mongoose, { Schema } from 'mongoose';
import { schemaComposer, toInputObjectType } from 'graphql-compose';
import {
  composeMongoose,
  PaginationResolverOpts,
} from 'graphql-compose-mongoose';

import { PlanetTC, Planet } from './Planets';
import { CharacterDocument, TypeComposerOpts } from '../types';
import { environment } from '../environment';
import { idField } from '../resolvers/common/idField';
import {
  createMutation,
  deleteMutation,
  getAllQuery,
  planetField,
  updateMutation,
} from '../resolvers/characters';
import { createCharacterValidationSchema } from '../validators/characterSchema';
import { EpisodeTC } from './Episodes';

const CharacterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      description: "Character's name",
    },
    planetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Planet,
    },
  },
  { timestamps: true }
);

export const Character = mongoose.model<CharacterDocument>(
  'Character',
  CharacterSchema,
  'characters'
);

const customizationOptions: TypeComposerOpts = {
  fields: {
    remove: [...environment.graphQL.removeFields, 'planetId'],
  },
};

export const CharacterTC = composeMongoose(Character, customizationOptions);

const CreateCharacterInputTC = toInputObjectType(CharacterTC);

const UpdateCharacterInputTC = schemaComposer.createInputTC({
  name: 'UpdateCharacterInput',
  fields: { id: 'MongoID!', name: 'String', planetId: 'MongoID' },
});

CreateCharacterInputTC.addFields({
  name: {
    type: 'String!',
    description: "Character's name",
  },
  planetId: {
    type: 'MongoID',
    description: 'Id of Planet',
  },
}).reorderFields(['id', 'name', 'planet', 'planetData']);

CharacterTC.addRelation('planetData', {
  resolver: () => PlanetTC.getResolver('findById'),
  prepareArgs: {
    _id: (source) => source.planetId,
  },
  projection: { planetId: true },
  description: "Full Planet's data",
});

CharacterTC.addRelation('episodes', {
  resolver: EpisodeTC.getResolver('getCharacterEpisodesName'),
  prepareArgs: {
    id: (source) => source.id,
  },
});

CharacterTC.addRelation('episodesData', {
  resolver: EpisodeTC.getResolver('getCharacterEpisodes'),
  prepareArgs: {
    id: (source) => source.id,
  },
  projection: { planetId: true },
});

CharacterTC.addFields({
  id: idField<CharacterDocument>(),
  planet: {
    type: 'String',
    resolve: planetField,
    projection: { planetId: true },
    description: "Planet's name",
  },
});

CharacterTC.addResolver({
  name: 'create',
  type: () => CharacterTC,
  args: {
    character: CreateCharacterInputTC,
  },
  resolve: createMutation,
  extensions: {
    validationSchema: createCharacterValidationSchema,
  },
  description: 'Create character',
});

CharacterTC.addResolver({
  name: 'update',
  type: () => CharacterTC,
  args: {
    character: UpdateCharacterInputTC,
  },
  resolve: updateMutation,
  description: 'Update character',
});

CharacterTC.addResolver({
  name: 'findManyFull',
  type: () =>
    schemaComposer.createObjectTC({
      name: 'Characters',
      fields: { items: [CharacterTC] },
    }),
  resolve: getAllQuery,
  projection: { planetID: true },
  description: 'Get list of all characters (w/o pagination)',
});

CharacterTC.addResolver({
  name: 'delete',
  type: CharacterTC,
  resolve: deleteMutation,
  args: {
    id: 'String',
  },
});

CharacterTC.reorderFields(['id', 'name', 'planet', 'planetData']);

const paginationOptions: PaginationResolverOpts = {
  perPage: environment.graphQL.pageSize,
};

export const characterQuery = {
  getCharacterById: CharacterTC.mongooseResolvers
    .findById()
    .wrapResolve((next) => (rp) => {
      rp.projection = { ...rp.projection, planetId: true };
      return next(rp);
    }),

  getCharacters: CharacterTC.mongooseResolvers
    .pagination(paginationOptions)
    .wrapResolve((next) => (rp) => {
      rp.projection = { ...rp.projection, planetId: true };
      return next(rp);
    })
    .setDescription('Get Characters paginated'),

  getAllCharacters: CharacterTC.getResolver('findManyFull'),
};

export const characterMutation = {
  createCharacter: CharacterTC.getResolver('create'),
  updateCharacter: CharacterTC.getResolver('update'),
  deleteCharacter: CharacterTC.getResolver('delete'),
};
