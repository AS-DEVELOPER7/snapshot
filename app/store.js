import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { photoGallery } from "./services";

export const store = configureStore({
  reducer: {
    [photoGallery.reducerPath]: photoGallery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(photoGallery.middleware),
});
setupListeners(store.dispatch);
