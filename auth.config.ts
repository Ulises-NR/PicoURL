import type { NextAuthConfig } from "next-auth";
import { privateRoutes } from "./routes";

export const authConfig = {
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
      // const isApiRoute = nextUrl.pathname.includes("/api");
      // const isAuthRoute = nextUrl.pathname.includes("/auth");

      // if (isApiRoute) return;

      if (isPrivateRoute && !isLoggedIn) {
        return Response.redirect(new URL("/auth/signin", nextUrl));
      }

      // if (isAuthRoute && isLoggedIn) {
      //   return Response.redirect(new URL("/", nextUrl));
      // }

      return true;
    },
    async jwt({ token }) {
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
