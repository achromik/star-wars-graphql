import { Planet } from '../../models/Planets';
import { CharacterDocument } from '../../types';

export const planetField = async (
  source: CharacterDocument
): Promise<string | null> => {
  const { planetId }: CharacterDocument = await source
    .populate('planetId')
    .execPopulate();

  if (planetId instanceof Planet) {
    return planetId.name;
  }

  return null;
};
