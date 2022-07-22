import { configureStore } from "@reduxjs/toolkit";
import { homeSlice } from "./HomSlice";
import { HomeSliceState } from "../types";
import { ConfigureStoreOptions } from "@reduxjs/toolkit/src/configureStore";

const options: ConfigureStoreOptions<HomeSliceState> = {
  reducer: homeSlice.reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
};

const store = configureStore<HomeSliceState>(options);

export default store;
