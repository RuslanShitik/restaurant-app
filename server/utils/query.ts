import { QueryObject } from 'ufo';
import { getPaginationQueryValidator } from '~/utils/validation';

interface GetPaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export const getPaginationParams = (
  query: QueryObject,
): GetPaginationParams => {
  const page = Number(query.page) > 0 ? Number(query.page) : 1;
  const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;
  const skip = (page - 1) * limit;
  return {
    page,
    limit,
    skip,
  };
};

export const getPaginationQuery = defineEventHandler(async (event) => {
  const q = await getValidatedQuery(event, getPaginationQueryValidator.parse);

  return q;
});
