import { ApolloServer } from 'apollo-server-lambda';

import { typeDefs } from './type-defs';
import { resolvers } from './resolvers';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export const handler = apolloServer.createHandler();
