import { environment } from '../environment';

export const resolvers = {
  Query: {
    message: (): string => environment.message,
  },
};
