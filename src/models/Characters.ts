import mongoose, { Schema } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import { PlanetsTC, Planets } from './Planets';
import { CharacterDocument, TypeComposerOpts } from '../types';
import { environment } from '../environment';
import { addIdField } from '../utils/addIdField';

const CharacterSchema: mongoose.Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    planetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Planets,
    },
  },
  { timestamps: true }
);

export const Characters = mongoose.model<CharacterDocument>(
  'Characters',
  CharacterSchema,
  'characters'
);

const customizationOptions: TypeComposerOpts = {
  fields: {
    remove: [...environment.removeFields, 'planetId', 'episodesIds'],
  },
};

const CharactersTC = composeWithMongoose(Characters, customizationOptions);

CharactersTC.addRelation('planetData', {
  resolver: () => PlanetsTC.getResolver('findById'),
  prepareArgs: {
    _id: (source) => source.planetId,
  },
  projection: { planetId: true },
});

CharactersTC.addFields({
  id: addIdField(),
  planet: {
    type: 'String',
    resolve: async (source: CharacterDocument): Promise<string | null> => {
      const { planetId }: CharacterDocument = await source
        .populate('planetId')
        .execPopulate();

      if (planetId instanceof Planets) {
        return planetId.name;
      }

      return null;
    },
    projection: { planetId: true },
  },
});

export const characterQuery = {
  getCharacterById: CharactersTC.getResolver('findById'),
  getAllCharacters: CharactersTC.getResolver('findMany'),
};
