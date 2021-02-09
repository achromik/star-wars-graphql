import { SchemaComposer } from 'graphql-compose';

import { characterQuery, characterMutation } from '../models/Characters';
import { planetQuery } from '../models/Planets';

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({ ...characterQuery, ...planetQuery });
schemaComposer.Mutation.addFields({ ...characterMutation });

export const graphqlSchema = schemaComposer.buildSchema();
