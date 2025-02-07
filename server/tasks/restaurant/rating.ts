import prisma from "~/lib/prisma";

export default defineTask({
  meta: {
    name: "restaurant:rating",
  },
  async run() {
    console.log("Running task restaurant:rating");
    const BATCH_SIZE = 100;
    let offset = 0;

    while (true) {
      const restaurants = await prisma.restaurant.findMany({
        skip: offset,
        take: BATCH_SIZE,
        include: {
          reviews: {
            select: { rating: true },
          },
        },
      });

      if (restaurants.length === 0) break;

      const updates = restaurants
        .filter((r) => r.reviews.length > 0)
        .map((r) => ({
          id: r.id,
          averageRating:
            r.reviews.reduce((acc, review) => acc + review.rating, 0) /
            r.reviews.length,
        }));

      await prisma.$transaction(
        updates.map(({ id, averageRating }) =>
          prisma.restaurant.update({
            where: { id },
            data: { averageRating: +averageRating.toFixed(2) },
          })
        )
      );

      offset += BATCH_SIZE;
    }

    console.log("Finish task restaurant:rating:");
    return {
      result: "success",
    };
  },
});
