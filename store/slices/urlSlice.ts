import { createSlice } from "@reduxjs/toolkit";

export const urlSlice = createSlice({
  name: "url",
  initialState: {
    urls: [],
    total: 0,
    pages: 1,
    page: 1,
    limit: 10,
  },
  reducers: {
    fetchShortedUrls: (state, action) => {
      return action.payload;
    },
    create: (state, action) => {
      if (state.urls.length % state.limit === 0) {
        state.pages++;
      } else {
        state.urls.push(action.payload);
      }
    },
    update: (state, action) => {
      state.urls = state.urls.map((url) =>
        url.shortURL === action.payload.shortURL ? action.payload : url
      );
    },
    remove: (state, action) => {
      const index = state.urls.findIndex(
        (url) => url.shortURL === action.payload
      );
      if (index !== -1) {
        state.urls.splice(index, 1);
        if (state.urls.length % state.limit === 0) {
          state.pages--;
        }
      }
    },
  },
});

export const { fetchShortedUrls, create, update, remove } = urlSlice.actions;

export default urlSlice.reducer;
