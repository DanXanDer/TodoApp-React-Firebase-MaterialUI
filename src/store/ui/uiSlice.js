import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState: {
    mobileOpen: false,
    navbarHeight: "",
    modalOpen: false,
  },
  reducers: {
    onChangeMobileOpenStatus: (state, action) => {
      state.mobileOpen = action.payload;
    },
    onChangeNavbarHeight: (state, action) => {
      state.navbarHeight = action.payload;
    },
    onCloseModal: (state) => {
      state.modalOpen = false;
    },
    onOpenModal: (state) => {
      state.modalOpen = true;
    },
  },
});

export const { onChangeMobileOpenStatus, onChangeNavbarHeight, onCloseModal, onOpenModal } =
  uiSlice.actions;
