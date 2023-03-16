import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { uiSlice } from "./ui";

export const store = configureStore({
  reducer: {
    uiSlice: uiSlice.reducer,
    authSlice: authSlice.reducer,
  },
});
