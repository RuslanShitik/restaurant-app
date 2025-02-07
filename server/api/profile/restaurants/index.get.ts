import { getRestaurantList } from '~/server/utils/service/restaurant';

defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const restaurants = await getRestaurantList({ where: { ownerId: user.id } });
  return restaurants;
});