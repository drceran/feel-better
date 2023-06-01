import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./usersApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { journalsApi } from "./journalsAPI";
import { authSlice } from "./authSlice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [journalsApi.reducerPath]: journalsApi.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware).concat(journalsApi.middleware),
});

setupListeners(store.dispatch);
