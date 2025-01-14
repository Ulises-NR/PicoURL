import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isApiRoute = nextUrl.pathname.includes("/api");
      const isAuthRoute = nextUrl.pathname.includes("/auth");

      if (isApiRoute) return;

      if (isAuthRoute && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          username: token.username,
          email: token.email,
        };
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
