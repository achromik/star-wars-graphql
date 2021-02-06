import { IResolvers } from 'apollo-server-lambda';
import { Id, Character, ResolversContext, ResolversSource } from '../types';

export const resolvers: IResolvers<ResolversSource, ResolversContext> = {
  Query: {
    getCharacters: async (_, __, { dataSources }): Promise<Character[]> => {
      return dataSources.characters.getCharacters();
    },
    getCharacter: async (
      _,
      { id }: { id: Id },
      { dataSources }
    ): Promise<Character | null | undefined> => {
      return dataSources.characters.getCharacterById(id);
    },
  },
  Character: {
    planet: (parent: Character): Id | undefined => {
      return parent.planetId;
    },
  },
};
