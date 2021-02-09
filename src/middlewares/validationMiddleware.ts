import { UserInputError } from 'apollo-server-lambda';
import { IMiddlewareFunction } from 'graphql-middleware';
import * as yup from 'yup';
import { GraphQLField, GraphQLObjectType } from 'graphql';

import { Context, MutationArgs } from '../types';

export const validationMiddleware: {
  Mutation: IMiddlewareFunction<unknown, Context, MutationArgs>;
} = {
  async Mutation(resolve, root, args, context, info) {
    const mutationType = info.schema.getMutationType();

    if (mutationType instanceof GraphQLObjectType) {
      const mutationField: GraphQLField<
        unknown,
        unknown
      > = mutationType.getFields()[info.fieldName];

      const mutationValidationSchema =
        mutationField.extensions?.validationSchema;

      if (mutationValidationSchema) {
        try {
          await mutationValidationSchema.validate(args);
        } catch (error) {
          if (error instanceof yup.ValidationError) {
            throw new UserInputError(error.message);
          } else {
            throw error;
          }
        }
      }
    }

    return resolve(root, args, context, info);
  },
};
