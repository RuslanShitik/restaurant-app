import { createRestaurantValidator } from '~/utils/validation';
import { createRestaurant } from '~/server/utils/service/restaurant';


export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const body = await readValidatedBody(event, createRestaurantValidator.parse);

  const result = await createRestaurant({ data: { ...body, ownerId: user.id } });

  setResponseStatus(event, 201);

  return result;
});

// TODO: validate count of restaurants, validate user account role
// TODO: Error handling