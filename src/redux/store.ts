import { configureStore } from "@reduxjs/toolkit";
import { profileApi } from "./profileApi";
import { walletApi } from "./walletApi";
import { dashboardApi } from "./dashboardApi";
import { adminApi } from "./adminApi";
import { baseApi } from "./baseApi";
import { booksApi } from "./features/books/books.api"; // ✅ NEW IMPORT

export const store = configureStore({
  reducer: {
    [walletApi.reducerPath]: walletApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer, // ✅ ADD BOOKS API REDUCER
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(walletApi.middleware)
      .concat(profileApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(baseApi.middleware)
      .concat(adminApi.middleware)
      .concat(booksApi.middleware), // ✅ ADD BOOKS API MIDDLEWARE
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

