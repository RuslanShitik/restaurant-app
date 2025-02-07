import { getUserFavoriteRestaurantList } from '~/server/utils/service/restaurant';

defineEventHandler(async (event) => {
  const {user} = await requireUserSession(event)
  const restaurants = await getUserFavoriteRestaurantList({userId: user.id})
  return restaurants;
})