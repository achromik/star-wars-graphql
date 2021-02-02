import { ApolloServer } from 'apollo-server-lambda';

import { environment } from '../environment';

import { typeDefs } from './type-defs';
import { resolvers } from './resolvers';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
});

export const handler = apolloServer.createHandler();
