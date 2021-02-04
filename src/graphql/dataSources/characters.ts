import { RESTDataSource } from 'apollo-datasource-rest';

import { environment } from '../../environment';
import { Id } from '../../types';

export class CharactersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = environment.apiUrl;
  }

  async getCharacters() {
    return this.get('characters');
  }

  async getCharacterById(id: Id) {
    return this.get(`characters/${id}`);
  }
}
