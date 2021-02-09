import { composeWithMongoose } from 'graphql-compose-mongoose';
import mongoose, { Schema } from 'mongoose';
import { abbreviateNumber } from 'js-abbreviation-number';

import { environment } from '../environment';
import { PlanetDocument, TypeComposerOpts } from '../types';
import { idField } from '../resolvers/common/idField';

const planetSchema: mongoose.Schema = new Schema(
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
  population: {
    type: 'String',
    resolve: (source: PlanetDocument) =>
      abbreviateNumber(source.population ?? 0),
    description: 'Population as short string',
  },
  populationValue: {
    type: 'Float',
    resolve: (source: PlanetDocument) => source.population,
    description: 'Population as number',
  },
});

PlanetTC.reorderFields([
  'id',
  'name',
  'population',
  'populationValue',
  'moons',
]);

export const planetQuery = {
  planetById: PlanetTC.getResolver('findById'),
  getAllPlanets: PlanetTC.getResolver('findMany'),
};
