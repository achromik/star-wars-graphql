import { Context, UpdateCharacterInput } from '../../types';

export const updateMutation = async ({
  context,
  args,
}: {
  context: Context;
  args: { character: UpdateCharacterInput };
}) => {
  const character = await context.Character.findOneAndUpdate(
    { _id: args.character.id },
    args.character,
    { new: true }
  );

  return character;
};
