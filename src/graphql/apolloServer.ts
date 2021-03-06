import { ApolloServer } from 'apollo-server-lambda';
import { applyMiddleware } from 'graphql-middleware';

import { environment } from '../environment';
import { graphqlSchema } from './schema';
import { Character, Planet, Episode } from '../models';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import { Context } from '../types';

const schemaWithMiddlewares = applyMiddleware(
  graphqlSchema,
  validationMiddleware
);

export const context = (): Context => ({
  Character,
  Planet,
  Episode,
});

export const apolloServer = new ApolloServer({
  schema: schemaWithMiddlewares,
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
  context,
});
