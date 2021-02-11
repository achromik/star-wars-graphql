import { CharacterTC } from '../../models/Characters';
import { paginationOptions } from './paginationOptions';

export const characterQuery = {
  getCharacterById: CharacterTC.mongooseResolvers
    .findById()
    .wrapResolve((next) => (rp) => {
      rp.projection = { ...rp.projection, planetId: true };
      return next(rp);
    }),

  getCharacters: CharacterTC.mongooseResolvers
    .pagination(paginationOptions)
    .wrapResolve((next) => (rp) => {
      rp.projection = { ...rp.projection, planetId: true };
      return next(rp);
    })
    .setDescription('Get Characters paginated'),

  getAllCharacters: CharacterTC.getResolver('findManyFull'),
};
