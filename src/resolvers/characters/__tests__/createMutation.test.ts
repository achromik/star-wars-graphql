import mockingoose from 'mockingoose';
import { ObjectId } from 'mongodb';

import { createMutation } from '../createMutation';
import { CharacterDocument, Context } from '../../../types';
import { Character, Planet, Episode } from '../../../models';
import { ApolloError } from 'apollo-server-lambda';

describe('Create character mutation', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('should create character', async () => {
    const mockCharacter = {
      name: 'Test Name',
      planetId: new ObjectId('602562fcfaf8a595e3072df8'),
    } as CharacterDocument;

    mockingoose(Character).toReturn(null, 'findOne');
    mockingoose(Planet).toReturn(
      { _id: mockCharacter.planetId, name: 'planet' },
      'findOne'
    );

    const context: Context = {
      Character: Character,
      Planet: Planet,
      Episode: Episode,
    };

    const args: { character: CharacterDocument } = { character: mockCharacter };

    const result = await createMutation({ context, args });

    expect(result).toHaveProperty('_id');
    expect(result).toHaveProperty('name', mockCharacter.name);
    expect(result).toHaveProperty('planetId', mockCharacter.planetId);
  });

  it('should throw an error if created username already exists', async () => {
    const mockCharacter = {
      name: 'Test Name',
    } as CharacterDocument;

    mockingoose(Character).toReturn(
      { _id: '6025620e5e2f8b29459dcb50' },
      'findOne'
    );

    const context: Context = {
      Character: Character,
      Planet: Planet,
      Episode: Episode,
    };

    const args: { character: CharacterDocument } = { character: mockCharacter };

    await expect(createMutation({ context, args })).rejects.toThrow(
      new ApolloError('User already exists!')
    );
  });

  it("should thro an error when provided planet doesn't exists", async () => {
    const mockCharacter = {
      name: 'Test Name',
      planetId: new ObjectId('602562fcfaf8a595e3072df8'),
    } as CharacterDocument;

    mockingoose(Character).toReturn(null, 'findOne');
    mockingoose(Planet).toReturn(null, 'findOne');

    const context: Context = {
      Character: Character,
      Planet: Planet,
      Episode: Episode,
    };

    const args: { character: CharacterDocument } = { character: mockCharacter };

    await expect(createMutation({ context, args })).rejects.toThrow(
      new ApolloError('No matching planet with provided id')
    );
  });
});
