import { SchemaComposer } from 'graphql-compose';

import { characterQuery, characterMutation } from '../models/Characters';
import { episodesQuery } from '../models/Episodes';
import { planetQuery } from '../models/Planets';

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
  ...characterQuery,
  ...planetQuery,
  ...episodesQuery,
});
schemaComposer.Mutation.addFields({ ...characterMutation });

export const graphqlSchema = schemaComposer.buildSchema();
