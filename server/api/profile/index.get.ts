import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const userData = await prisma.user.findUniqueOrThrow({
    where: { id: user.id },
    omit: {
      password: true,
    },
  });

  return userData;
});
