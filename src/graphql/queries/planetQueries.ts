import { PlanetTC } from '../../models/Planets';

export const planetQuery = {
  planetById: PlanetTC.getResolver('findById'),
  getAllPlanets: PlanetTC.getResolver('findMany'),
};
