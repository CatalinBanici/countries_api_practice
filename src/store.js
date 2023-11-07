import { configureStore } from "@reduxjs/toolkit";
import { countriesApi } from "./apiSlice"; // Import your RTK Query API slice

export const store = configureStore({
  reducer: {
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countriesApi.middleware),
});
