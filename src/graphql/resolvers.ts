import { IResolvers } from 'apollo-server-lambda';

import { Id, Character } from '../types';

export const resolvers: IResolvers = {
  Query: {
    getCharacters: async (
      _source,
      _args,
      { dataSources }
    ): Promise<Character[]> => {
      return dataSources.charactersApi.getCharacters();
    },
    getCharacter: async (
      _source,
      { id },
      { dataSources }
    ): Promise<Character> => {
      return dataSources.charactersApi.getCharacterById(id);
    },
  },
  Character: {
    planet: (parent): Id => {
      return parent.planetId;
    },
  },
};
