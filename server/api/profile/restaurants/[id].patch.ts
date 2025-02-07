import prisma from '~/lib/prisma';
import {
  idParamValidator,
  updateRestaurantValidator,
} from '~/utils/validation';
import { updateRestaurantById, updateUserRestaurantById } from '~/server/utils/service/restaurant';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const { id } = await getValidatedRouterParams(event, idParamValidator.parse);
  const body = await readValidatedBody(event, updateRestaurantValidator.parse);

  const updatedRestaurant = await updateUserRestaurantById({ userId: user.id, restaurantId: id, data: body });

  return updatedRestaurant;
});
