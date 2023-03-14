import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'uiSlice',
  initialState: {
    submitted: false,
    checking: false,
  },
  reducers: {
    onChangeSubmitStatus: (state, action) => {
        state.submitted = action.payload // true or false
    },
    onChangeCheckingStatus: (state, action) => {
        state.submitted = action.payload //true or false
    }
  }
});

export const { onChangeSubmitStatus, onChangeCheckingStatus } = uiSlice.actions;