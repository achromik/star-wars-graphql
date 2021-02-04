import { ApolloServer } from 'apollo-server-lambda';

import { environment } from '../environment';

import { typeDefs } from './type-defs';
import { resolvers } from './resolvers';
import { CharactersAPI } from './dataSources/characters';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
  dataSources: () => {
    return {
      charactersApi: new CharactersAPI(),
    };
  },
});

export const handler = apolloServer.createHandler();
