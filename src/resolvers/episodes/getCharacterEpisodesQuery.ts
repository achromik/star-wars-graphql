import { Context, EpisodeDocument } from '../../types';

export const getCharacterEpisodesQuery = async ({
  context,
  args,
}: {
  context: Context;
  args: { id: string };
}): Promise<EpisodeDocument[]> => {
  return context.Episode.find({
    charactersIds: { $elemMatch: { $eq: args.id } },
  })
    .populate('characterIds')
    .exec();
};

export const getCharacterEpisodesNameQuery = async ({
  context,
  args,
}: {
  context: Context;
  args: { id: string };
}): Promise<string[]> => {
  const result = await context.Episode.find({
    charactersIds: { $elemMatch: { $eq: args.id } },
  }).exec();

  return result.map((item) => item.name);
};
