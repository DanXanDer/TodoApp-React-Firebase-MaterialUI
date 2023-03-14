import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui";

export const store = configureStore({
  reducer: {
    uiSlice: uiSlice.reducer,
  },
});
