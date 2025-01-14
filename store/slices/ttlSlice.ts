import { createSlice } from "@reduxjs/toolkit";

export const ttlSlice = createSlice({
  name: "ttl",
  initialState: {
    url: null,
  },
  reducers: {
    createTtlUrl: (state, action) => {
      state.url = action.payload;
    },
    resetTtl: (state) => {
      state.url = null;
    },
  },
});

export const { createTtlUrl, resetTtl } = ttlSlice.actions;

export default ttlSlice.reducer;
