import { UserInputError } from 'apollo-server-lambda';
import * as yup from 'yup';
import { GraphQLField, GraphQLObjectType } from 'graphql';
import { IMiddlewareResolver } from 'graphql-middleware/dist/types';

import { Context, MutationArgs } from '../types';

export const validateMutationInputs: IMiddlewareResolver = async (
  resolve,
  root,
  args,
  context,
  info
) => {
  const mutationType = info.schema.getMutationType();

  if (mutationType instanceof GraphQLObjectType) {
    const mutationField: GraphQLField<
      unknown,
      unknown
    > = mutationType.getFields()[info.fieldName];

    const mutationValidationSchema = mutationField.extensions?.validationSchema;

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
};

export const validationMiddleware: {
  Mutation: IMiddlewareResolver<unknown, Context, MutationArgs>;
} = {
  Mutation: validateMutationInputs,
};
