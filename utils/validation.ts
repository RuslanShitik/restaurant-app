import { z } from 'zod';

export const createRestaurantValidator = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  address: z.string().min(3),
});

export const updateRestaurantValidator = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(3).optional(),
  address: z.string().min(3).optional(),
});

export const createReviewValidator = z.object({
  rating: z.number().min(1).max(10),
  comment: z.string(),
  restaurantId: z.number(),
});

export const createFavoriteValidator = z.object({
  restaurantId: z.number(),
});

export const deleteFavoriteValidator = z.object({
  restaurantId: z.number(),
});

export const idParamValidator = z.object({
  id: z.preprocess(Number, z.number()),
});

export const getReviewsQueryValidator = z.object({
  restaurantId: z.preprocess(Number, z.number()),
});

export const getRestaurantListQueryValidator = z.object({
  name: z.string().optional(),
  minRating: z.preprocess(Number, z.number().min(0).max(10)).optional(),
});

export const getPaginationQueryValidator = z.object({
  page: z.preprocess(Number, z.number()).optional(),
  limit: z.preprocess(Number, z.number()).optional(),
  skip: z.preprocess(Number, z.number()).optional(),
});

export type UpdateRestaurantValidator = z.output<
  typeof updateRestaurantValidator
>;
export type CreateReviewValidator = z.output<typeof createReviewValidator>;
export type CreateRestaurantValidator = z.output<
  typeof createRestaurantValidator
>;
