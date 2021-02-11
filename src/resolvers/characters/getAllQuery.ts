import { CharacterDocument, Context } from '../../types';

export const getAllQuery = async ({
  context,
}: {
  context: Context;
}): Promise<{ items: CharacterDocument[] }> => {
  const characters = await context.Character.find({}).exec();

  return { items: characters };
};
