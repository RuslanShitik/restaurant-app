import { idParamValidator } from '~/utils/validation';
import { getRestaurantById } from '~/server/utils/service/restaurant';


export default defineCachedEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, idParamValidator.parse);

  const restaurant = await getRestaurantById(id);

  return restaurant;
});

