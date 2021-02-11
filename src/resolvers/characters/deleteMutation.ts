import { UserInputError } from 'apollo-server-lambda';
import { CharacterDocument, Context } from '../../types';

export const deleteMutation = async ({
  context,
  args,
}: {
  context: Context;
  args: { id: string };
}): Promise<CharacterDocument | null> => {
  const episodes = await context.Episode.find({
    charactersIds: { $elemMatch: { $eq: args.id } },
  });

  if (episodes.length > 0) {
    throw new UserInputError('Character exists on Episodes');
  }

  return context.Character.findOneAndRemove({
    _id: args.id,
  }).exec();
};
