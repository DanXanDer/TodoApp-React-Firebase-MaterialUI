import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { todoSlice } from "./todo";
import { uiSlice } from "./ui";

export const store = configureStore({
  reducer: {
    uiSlice: uiSlice.reducer,
    authSlice: authSlice.reducer,
    todoSlice: todoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
