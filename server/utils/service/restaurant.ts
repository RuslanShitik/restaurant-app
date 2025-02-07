import type { Restaurant } from '@prisma/client';
import prisma from '~/lib/prisma';
import type { Prisma } from '@prisma/client';
import { paginatedResult, PaginatedResult } from '~/server/utils/pagination';

const PAGE_SIZE = 3; /*TODO: edit size*/

const getSkip = (page: number): number => (page - 1) * PAGE_SIZE;

export const getRestaurantById = async (id: number): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id },
  });

  if (!restaurant) {
    throw createError({
      status: 404,
      message: 'Restaurant not found',
    });
  }

  return restaurant;
};

type GetRestaurantListArgs = {
  page?: number,
  where?: Prisma.RestaurantWhereInput,
}

export const getRestaurantList = async ({
                                          where,
                                          page = 1,
                                        }: GetRestaurantListArgs): Promise<PaginatedResult<Restaurant[]>> => {
  const skip = getSkip(page);

  const restaurants = await prisma.restaurant.findMany({ where, skip, take: PAGE_SIZE });
  const total = await prisma.restaurant.count({ where });

  return paginatedResult(restaurants, total, page, PAGE_SIZE);
};

type GetUserFavoriteRestaurantListArgs = GetRestaurantListArgs & {
  userId: number
}

export const getUserFavoriteRestaurantList = async ({
                                                      where,
                                                      userId,
                                                      page,
                                                    }: GetUserFavoriteRestaurantListArgs): Promise<PaginatedResult<Restaurant[]>> => {
  return getRestaurantList({
    where: {
      ...where,
      favorites: {
        some: {
          userId,
        },
      },
    },
    page,
  });
};


export const getOwnerRestaurantList = async (ownerId: number, page?: number): Promise<PaginatedResult<Restaurant[]>> => {
  return getRestaurantList({ where: { ownerId } });
};

type CreateRestaurantArgs = {
  data: Prisma.RestaurantUncheckedCreateInput
}

export const createRestaurant = async ({ data }: CreateRestaurantArgs): Promise<Restaurant> => {
  return prisma.restaurant.create({ data });
};

type UpdateRestaurantByIdArgs = {
  id: number,
  data: Prisma.RestaurantUpdateInput
}

export const updateRestaurantById = async ({ id, data }: UpdateRestaurantByIdArgs): Promise<Restaurant> => {
  return prisma.restaurant.update({
    where: {
      id,
    },
    data,
  });
};

type UpdateUserRestaurantByIdArgs = {
  userId: number;
  restaurantId: number;
  data: Prisma.RestaurantUpdateInput;
};


export const updateUserRestaurantById = async ({
                                                 userId,
                                                 restaurantId,
                                                 data,
                                               }: UpdateUserRestaurantByIdArgs) => {

  const restaurant = await prisma.restaurant.findUnique({
    where: { id: restaurantId, ownerId: userId },
  });

  if (!restaurant) {
    throw createError({
      status: 404,
      message: 'Restaurant not found',
    });
  }

  return prisma.restaurant.update({
    where: { id: restaurantId },
    data,
  });

};

// TODO: finish service