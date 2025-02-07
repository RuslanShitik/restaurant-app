import {
  idParamValidator,
} from '~/utils/validation';
import { getReviewList } from '~/server/utils/service/review';

export default defineEventHandler(async (event) => {
  const { page } = await getPaginationQuery(event);
  const { id } = await getValidatedRouterParams(event, idParamValidator.parse);
  const reviews = await getReviewList({ page, where: { restaurantId: id } });
  return reviews;
});