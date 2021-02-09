import mongoose, { Schema } from 'mongoose';
import { toInputObjectType } from 'graphql-compose';
import {
  composeMongoose,
  PaginationResolverOpts,
} from 'graphql-compose-mongoose';

import { PlanetTC, Planet } from './Planets';
import { CharacterDocument, TypeComposerOpts } from '../types';
import { environment } from '../environment';
import { idField } from '../resolvers/common/idField';
import { createMutation } from '../resolvers/characters/createMutation';
import { createCharacterValidationSchema } from '../validators/characterSchema';
import { planetField } from '../resolvers/characters/planetField';

const CharacterSchema: mongoose.Schema = new Schema(
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

const CharacterTC = composeMongoose(Character, customizationOptions);

const CreateCharacterInputObjectType = toInputObjectType(CharacterTC);

CreateCharacterInputObjectType.addFields({
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
    character: CreateCharacterInputObjectType,
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
    character: CreateCharacterInputObjectType,
  },
  resolve: () => {
    return 'to do';
  },
  description: 'Update character',
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
  getAllCharacters: CharacterTC.mongooseResolvers
    .pagination(paginationOptions)
    .wrapResolve((next) => (rp) => {
      rp.projection = { ...rp.projection, planetId: true };
      return next(rp);
    }),
};

export const characterMutation = {
  // characterCreateOne: CharacterTC.mongooseResolvers.createOne(),
  // characterRemoveOne: CharacterTC.mongooseResolvers.removeOne(),
  createCharacter: CharacterTC.getResolver('create'),
  updateCharacter: CharacterTC.getResolver('update'),
};
