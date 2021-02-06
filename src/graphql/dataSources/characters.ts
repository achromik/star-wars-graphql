import { MongoDataSource } from 'apollo-datasource-mongodb';

import { Character, Id, CharacterDocument } from '../../types';
import { renameId } from '../../utils';

export class Characters extends MongoDataSource<CharacterDocument> {
  async getCharacters(): Promise<Character[]> {
    const response = await this.collection.find({}).toArray();

    return response.map((item) => renameId<CharacterDocument, Character>(item));
  }

  async getCharacterById(id: Id): Promise<Character | null> {
    const response = await this.findOneById(id);

    if (response?._id) {
      return renameId<CharacterDocument, Character>(response);
    }

    return null;
  }
}
