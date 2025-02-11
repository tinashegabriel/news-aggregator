import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "./preferencesSlice";

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
  },
});

// Infer RootState and AppDispatch from store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
