import { UserInputError } from 'apollo-server-lambda';
import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLResolveInfo,
  GraphQLString,
} from 'graphql';
import * as yup from 'yup';
import { Context } from '../../types';

import { validationMiddleware } from '../validationMiddleware';

const validationSchema = yup.object().shape({
  name: yup.string().min(10),
  number: yup.number().max(200),
});

const mockMutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    testMutation: {
      type: new GraphQLNonNull(GraphQLString),
      extensions: {
        validationSchema,
      },
      args: { name: { type: GraphQLString } },
    },
  },
});

const mockInfo = {
  schema: {
    getMutationType: jest.fn(),
  },
  fieldName: 'testMutation',
};

const mockContext = {
  Character: jest.fn(),
  Planet: jest.fn(),
};

describe('validationMiddleware', () => {
  it('should call resolver when valid arguments passed', async () => {
    mockInfo.schema.getMutationType.mockReturnValue(mockMutationType);

    const resolver = jest.fn();
    resolver.mockReturnValue(true);

    const args = { name: 'veryLongName', number: 123 };

    await expect(
      validationMiddleware.Mutation(
        resolver,
        null,
        args,
        (mockContext as unknown) as Context,
        (mockInfo as unknown) as GraphQLResolveInfo
      )
    ).resolves.toBe(true);

    expect(resolver).toHaveBeenCalledTimes(1);
  });

  it('should thrown an error when invalid arguments passed', async () => {
    mockInfo.schema.getMutationType.mockReturnValue(mockMutationType);

    const resolver = jest.fn();

    const args = { name: 'short', number: 123 };

    await expect(
      validationMiddleware.Mutation(
        resolver,
        null,
        args,
        (mockContext as unknown) as Context,
        (mockInfo as unknown) as GraphQLResolveInfo
      )
    ).rejects.toThrow(UserInputError);

    expect(resolver).toHaveBeenCalledTimes(0);
  });

  it('should thrown an error when valid arguments passed but something another during validation fails', async () => {
    mockInfo.schema.getMutationType.mockReturnValue(
      new GraphQLObjectType({
        name: 'Mutation',
        fields: {
          testMutation: {
            type: new GraphQLNonNull(GraphQLString),
            extensions: {
              validationSchema: {
                validate: jest.fn().mockImplementation(() => {
                  throw new Error('Another error');
                }),
              },
            },
            args: { name: { type: GraphQLString } },
          },
        },
      })
    );

    const resolver = jest.fn();

    const args = { name: 'veryLongName', number: 123 };

    await expect(
      validationMiddleware.Mutation(
        resolver,
        null,
        args,
        (mockContext as unknown) as Context,
        (mockInfo as unknown) as GraphQLResolveInfo
      )
    ).rejects.toThrow(Error('Another error'));

    expect(resolver).toHaveBeenCalledTimes(0);
  });
});
