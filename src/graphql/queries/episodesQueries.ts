import { EpisodeTC } from '../../models/Episodes';
import { paginationOptions } from './paginationOptions';

export const episodesQuery = {
  getAllEpisodes: EpisodeTC.mongooseResolvers
    .pagination(paginationOptions)
    .wrapResolve((next) => (rp) => {
      rp.projection = { ...rp.projection, charactersIds: true, planetId: true };
      return next(rp);
    }),
  getCharacterEpisodes: EpisodeTC.getResolver('getCharacterEpisodes'),
};
