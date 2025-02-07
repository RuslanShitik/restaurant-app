import prisma from "~/lib/prisma";

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user: githubUser }) {
    let user = await prisma.user.findUnique({
      where: { email: githubUser.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: githubUser.name,
          email: githubUser.email,
          password: "",
          role: "user",
        },
      });

      await prisma.oAuthAccount.create({
        data: {
          userId: user.id,
          providerId: "github",
          providedUserId: githubUser.id,
        },
      });
    }

    await setUserSession(event, {
      user: {
        id: user.id,
        role: user.role,
      },
    });

    return sendRedirect(event, "/");
  },
  onError(event, error) {
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
