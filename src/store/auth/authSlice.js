import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    status: "checking",
    todos: [],
    user: {
      uid: "",
      displayName: "",
      email: "",
    },
    submitted: false,
    checkingForm: false,
    errorMsg: undefined,
  },
  reducers: {
    onLogin: (state, action) => {
      state.status = "authenticated";
      state.user.uid = action.payload.uid;
      state.user.displayName = action.payload.displayName;
      state.user.email = action.payload.email;
      state.submitted = false;
      state.checkingForm = false;
    },
    onLogout: (state) => {
      state.status = "not-authenticated";
      state.todos = [];
      state.user = {
        id: "",
        displayName: "",
        email: "",
      };
      state.submitted = false;
      state.checkingForm = false;
      state.errorMsg = undefined;
    },
    onCheckingAuth: (state) => {
      state.status = "checking"; // authenticated, not-authenticated and checking
    },
    onChangeSubmitStatus: (state, action) => {
      state.submitted = action.payload; // true or false
    },
    onCheckingForm: (state, action) => {
      state.checkingForm = action.payload; //true or false
    },
    onErrorMsg: (state, action) => {
      if (action.payload === "") {
        state.errorMsg = undefined;
      } else {
        state.errorMsg = action.payload;
      }
    },
  },
});

export const {
  onCheckingForm,
  onChangeSubmitStatus,
  onLogin,
  onLogout,
  onErrorMsg,
  onCheckingAuth,
} = authSlice.actions;
