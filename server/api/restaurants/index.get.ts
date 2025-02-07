import prisma from '~/lib/prisma';
import { getPaginationParams, getPaginationQuery } from '~/server/utils/query';
import { createPaginatedResponse } from '~/server/utils/response';
import { getRestaurantList } from '~/server/utils/service/restaurant';
import { getRestaurantListQueryValidator } from '~/utils/validation';

export default defineEventHandler(async (event) => {

  const { page } = await getPaginationQuery(event);
  const { name, minRating } = await getValidatedQuery(event, getRestaurantListQueryValidator.parse);

  const filter: any = {};

  if (name) {
    filter.name = { contains: name, mode: 'insensitive' };
  }

  if (minRating) {
    filter.averageRating = { gte: minRating };
  }

  const result = await getRestaurantList({
    where: filter,
    page,
  });

  return result;
});

// TODO: add pagination and filtering options to the query.
