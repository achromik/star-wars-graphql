import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ObjectID } from 'mongodb';

import { Id } from '../../types';

interface CharacterDocument {
  _id: ObjectID;
  name: string;
}

interface Context {
  character: CharacterDocument;
}

export class Characters extends MongoDataSource<CharacterDocument, Context> {
  async getCharacters() {
    return this.collection.find({}).toArray();
  }

  async getCharacterById(id: Id) {
    return this.findOneById(id);
  }
}
