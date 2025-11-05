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



/*
import { profileApi } from "./profileApi";
import { walletApi } from "./walletApi";
import { configureStore } from "@reduxjs/toolkit";
import { dashboardApi } from "./dashboardApi";
import { adminApi } from "./adminApi";
import { baseApi } from "./baseApi";

export const store = configureStore({
  reducer: {
    // এখানে সব slice যোগ হবে
    [walletApi.reducerPath]: walletApi.reducer, // আমাদের walletApi reducer
    [profileApi.reducerPath]: profileApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
   .concat(walletApi.middleware)
   .concat(profileApi.middleware)  // add profileApi middleware
   .concat(dashboardApi.middleware)
   .concat(baseApi.middleware)
   .concat(adminApi.middleware),
  // RTK Query middleware যোগ করতে হবে, যাতে API caching, polling, refetch কাজ করে
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
*/

/* 
👉 Key points:

configureStore = Redux store তৈরি করে।

walletApi.reducer = RTK Query এর data/cache store করে।

walletApi.middleware = background re-fetching, cache invalidation ইত্যাদি enable করে।

RootState আর AppDispatch TypeScript এ type checking এর জন্য।
*/




/*

🔑 কিভাবে কাজ করে?

walletApi.ts → API service define করে + hook export করে।

store.ts → API reducer + middleware Redux store এ add করে।

Component এ → আপনি শুধু const [sendMoney] = useSendMoneyMutation() ইউজ করলে API call ready!



*/