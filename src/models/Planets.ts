import { composeWithMongoose } from 'graphql-compose-mongoose';
import mongoose, { Schema } from 'mongoose';
import { PlanetDocument } from '../types';

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

const customizationOptions = {};
export const PlanetsTC = composeWithMongoose(Planets, customizationOptions);

export const planetQuery = {
  planetById: PlanetsTC.getResolver('findById'),
  getAllPlanets: PlanetsTC.getResolver('findMany'),
};
