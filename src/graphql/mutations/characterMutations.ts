import { CharacterTC } from '../../models/Characters';

export const characterMutation = {
  createCharacter: CharacterTC.getResolver('create'),
  updateCharacter: CharacterTC.getResolver('update'),
  deleteCharacter: CharacterTC.getResolver('delete'),
};
