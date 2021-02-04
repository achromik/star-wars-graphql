import { gql } from 'apollo-server-lambda';

export const typeDefs = gql`
  type Character {
    id: ID
    name: String
    planet: String
    episodes: [Episode]
  }

  type Episode {
    id: ID
    name: String
  }

  type Query {
    """
    Return all characters
    """
    getCharacters: [Character]
    """
    Return character with id
    """
    getCharacter(id: ID!): Character
  }
`;
