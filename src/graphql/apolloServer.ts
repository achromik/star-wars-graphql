import { ApolloServer } from 'apollo-server-lambda';

import { environment } from '../environment';
import { graphqlSchema } from './schema';
import { validationMiddleware } from '../middlewares/validationMiddleware';

const schemaWithMiddlewares = applyMiddleware(
  graphqlSchema,
  validationMiddleware
);

export const apolloServer = new ApolloServer({
  schema: graphqlSchema,
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
  context: () => ({
    Characters,
    Planets,
  }),
});
