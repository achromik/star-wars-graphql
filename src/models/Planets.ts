import { composeWithMongoose } from 'graphql-compose-mongoose';
import mongoose, { Schema } from 'mongoose';

import { environment } from '../environment';
import { PlanetDocument, TypeComposerOpts } from '../types';
import { addIdField } from '../utils/addIdField';

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

export const Planets = mongoose.model<PlanetDocument>(
  'Planets',
  planetSchema,
  'planets'
);

const customizationOptions: TypeComposerOpts = {
  fields: {
    remove: [...environment.removeFields],
  },
};
export const PlanetsTC = composeWithMongoose(Planets, customizationOptions);

PlanetsTC.addFields({
  id: addIdField(),
});

export const planetQuery = {
  planetById: PlanetsTC.getResolver('findById'),
  getAllPlanets: PlanetsTC.getResolver('findMany'),
};
