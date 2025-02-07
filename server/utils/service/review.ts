import type { Review } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import { paginatedResult } from '~/server/utils/pagination';
import prisma from '~/lib/prisma';

const PAGE_SIZE = 3; /*TODO: edit size*/

type GetReviewListArgs = {
  page?: number;
  where?: Prisma.ReviewWhereInput
}

export const getReviewList = async ({ page = 1, where }: GetReviewListArgs): Promise<PaginatedResult<Review[]>> => {
  const skip = (page - 1) * PAGE_SIZE;
  const reviews = await prisma.review.findMany({
    where, include: {
      user: true,
    }, skip, take: PAGE_SIZE,
  });
  const total = await prisma.review.count({ where });
  return paginatedResult(reviews, total, page, PAGE_SIZE);
};
//TODO: review service