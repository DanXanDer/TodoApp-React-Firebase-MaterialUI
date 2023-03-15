import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    
  },
  reducers: {
    reducer1: (state) => {
      state.property += 1
    }
  }
});

export const { reducer } = authSlice.actions;
export default authSlice.reducer;