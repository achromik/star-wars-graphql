import { SchemaComposer } from 'graphql-compose';

import { characterQuery } from '../models/Characters';
import { planetQuery } from '../models/Planets';

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({ ...characterQuery, ...planetQuery });

export const graphqlSchema = schemaComposer.buildSchema();
