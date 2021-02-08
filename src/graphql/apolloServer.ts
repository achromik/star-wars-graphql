import { ApolloServer } from 'apollo-server-lambda';

import { environment } from '../environment';
import { graphqlSchema } from './schema';
import { Characters } from '../models/Characters';
import { Planets } from '../models/Planets';

export const apolloServer = new ApolloServer({
  schema: graphqlSchema,
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
  context: () => ({
    Characters,
    Planets,
  }),
});
