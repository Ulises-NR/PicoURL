import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { connectionToDatabase } from "@/utils/dbConnection";
import User from "./models/user.model";
import bcrypt from "bcryptjs";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        let user = null;
        if (credentials === null) return null;

        await connectionToDatabase();

        const userFound = await User.findOne({
          email: credentials?.email,
        });
        if (!userFound) throw new Error("No user found");

        const isPasswordMatch = await bcrypt.compare(
          credentials.password as string,
          userFound.password
        );
        if (!isPasswordMatch) throw new Error("Wrong password");

        user = {
          id: userFound._id,
          username: userFound.username,
          email: userFound.email,
        };

        return user;
      },
    }),
  ],
});
