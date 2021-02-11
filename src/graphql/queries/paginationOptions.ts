import { PaginationResolverOpts } from 'graphql-compose-mongoose';
import { environment } from '../../environment';

export const paginationOptions: PaginationResolverOpts = {
  perPage: environment.graphQL.pageSize,
};
