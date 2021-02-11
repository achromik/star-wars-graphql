import { ApolloError } from 'apollo-server-lambda';

import { Character } from '../../models';
import { CharacterDocument, CharacterInput, Context } from '../../types';

export const createMutation = async ({
  context,
  args,
}: {
  context: Context;
  args: { character: CharacterInput };
}): Promise<CharacterDocument> => {
  const { character } = args;

  const characterResponse = await context.Character.findOne({
    name: character.name,
  }).exec();

  if (characterResponse !== null) {
    throw new ApolloError('User already exists!');
  }

  if (character.planetId) {
    const planetResponse = await context.Planet.findById(character.planetId);

    if (planetResponse === null) {
      throw new ApolloError('No matching planet with provided id');
    }
  }

  const newCharacter = new Character({ ...args.character });
  return newCharacter.save();
};
