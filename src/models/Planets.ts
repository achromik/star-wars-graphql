import { composeWithMongoose } from 'graphql-compose-mongoose';
import mongoose, { Schema } from 'mongoose';

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
  id: idField(),
});

export const planetQuery = {
  planetById: PlanetTC.getResolver('findById'),
  getAllPlanets: PlanetTC.getResolver('findMany'),
};
