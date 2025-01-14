"use client";

import ReduxProvider from "@/store/providers/redux-provider";

export const Wrapper = ({ children }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};
