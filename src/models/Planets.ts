import { composeWithMongoose } from 'graphql-compose-mongoose';
import mongoose, { Schema } from 'mongoose';

import { environment } from '../environment';
import { PlanetDocument, TypeComposerOpts } from '../types';
import { idField } from '../resolvers/common/idField';
import { populationAbbrevField, populationField } from '../resolvers/planets';

const planetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    moons: {
      type: Number,
      description: 'Numbers of moons',
    },
    population: {
      type: Number,
      description: 'Population',
    },
  },
  { timestamps: true }
);

export const Planet = mongoose.model<PlanetDocument>(
  'Planet',
  planetSchema,
  'planets'
);

const customizationOptions: TypeComposerOpts = {
  fields: {
    remove: [...environment.graphQL.removeFields],
  },
};
export const PlanetTC = composeWithMongoose(Planet, customizationOptions);

PlanetTC.addFields({
  id: idField<PlanetDocument>(),
  populationAbbrev: {
    type: 'String',
    resolve: populationAbbrevField,
    description: 'Population as short string',
  },
  population: {
    type: 'Float',
    resolve: populationField,
    description: 'Population as number',
  },
});

PlanetTC.reorderFields([
  'id',
  'name',
  'population',
  'populationAbbrev',
  'moons',
]);
