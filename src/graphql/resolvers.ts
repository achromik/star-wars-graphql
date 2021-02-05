import { IResolvers } from 'apollo-server-lambda';

import { Id, Character } from '../types';

export const resolvers: IResolvers = {
  Query: {
    getCharacters: async (
      _source,
      _args,
      { dataSources }
    ): Promise<Character[]> => {
      return dataSources.characters.getCharacters();
    },
    getCharacter: async (
      _source,
      { id },
      { dataSources }
    ): Promise<Character> => {
      return dataSources.characters.getCharacterById(id);
    },
  },
  Character: {
    planet: (parent): Id => {
      return parent.planetId;
    },
  },
};
