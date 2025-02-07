import prisma from "~/lib/prisma";

export default defineOAuthGoogleEventHandler({
  config: {},
  onSuccess: async (event, { user, tokens }) => {
    await setUserSession(event, { user });
    return sendRedirect(event,'/')
  },
});
