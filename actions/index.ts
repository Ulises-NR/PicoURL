"use server";

import { signIn, signOut } from "@/auth";

export const login = async (values) => {
  try {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    return res;
  } catch (e) {
    throw e;
  }
};

export const logout = async () => {
  await signOut({ redirectTo: "/auth/signin" });
};
