import { SchemaComposer } from 'graphql-compose';

import { characterQuery, episodesQuery, planetQuery } from './queries';
import { characterMutation } from './mutations';

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
  ...characterQuery,
  ...planetQuery,
  ...episodesQuery,
});
schemaComposer.Mutation.addFields({ ...characterMutation });

export const graphqlSchema = schemaComposer.buildSchema();
