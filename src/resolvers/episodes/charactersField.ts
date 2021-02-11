import { CharacterDocument, Context, EpisodeDocument } from '../../types';

export const charactersField = async (
  source: EpisodeDocument,
  _: unknown,
  context: Context
): Promise<CharacterDocument[]> => {
  return context.Character.find({
    _id: { $in: source.charactersIds },
  })
    .populate('planetId')
    .exec();
};
