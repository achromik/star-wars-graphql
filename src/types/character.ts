import { Id } from './id';

export type Character = {
  id: Id;
  name?: string;
  episodes?: Array<Id>;
  planetId?: Id;
};
