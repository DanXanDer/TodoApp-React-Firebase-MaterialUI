import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState: {
    submitted: false,
    checking: false,
    mobileOpen: false,
  },
  reducers: {
    onChangeSubmitStatus: (state, action) => {
      state.submitted = action.payload; // true or false
    },
    onChangeCheckingStatus: (state, action) => {
      state.checking = action.payload; //true or false
    },
    onChangeMobileOpenStatus: (state, action) => {
      state.mobileOpen = action.payload;
    },
  },
});

export const { onChangeSubmitStatus, onChangeCheckingStatus, onChangeMobileOpenStatus } = uiSlice.actions;
