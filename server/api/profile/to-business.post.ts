import prisma from "~/lib/prisma";
import { $Enums } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  if (user.role === $Enums.Role.business) {
    throw createError({
      status: 400,
      message: "Your account is already business",
    });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { role: $Enums.Role.business },
  });

  setResponseStatus(event, 200);
});
