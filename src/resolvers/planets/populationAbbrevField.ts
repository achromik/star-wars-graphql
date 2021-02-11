import { abbreviateNumber } from 'js-abbreviation-number';

import { PlanetDocument } from '../../types';

export const populationAbbrevField = (source: PlanetDocument) =>
  abbreviateNumber(source.population ?? 0);
