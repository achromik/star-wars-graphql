import { ApolloServer } from 'apollo-server-lambda';
import { applyMiddleware } from 'graphql-middleware';

import { environment } from '../environment';
import { graphqlSchema } from './schema';
import { Character } from '../models/Characters';
import { Planet } from '../models/Planets';
import { validationMiddleware } from '../middlewares/validationMiddleware';

const schemaWithMiddlewares = applyMiddleware(
  graphqlSchema,
  validationMiddleware
);

export const context = () => ({
  Character,
  Planet,
});

export const apolloServer = new ApolloServer({
  schema: schemaWithMiddlewares,
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
  context,
});
