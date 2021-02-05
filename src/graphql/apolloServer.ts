import { ApolloServer } from 'apollo-server-lambda';

import { environment } from '../environment';
import { typeDefs } from './type-defs';
import { resolvers } from './resolvers';
import { Characters } from './dataSources/characters';
import { db } from '../database';

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
  dataSources: () => {
    return {
      characters: new Characters(db.collection('characters')),
    };
  },
});
