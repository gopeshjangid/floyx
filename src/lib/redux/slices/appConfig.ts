import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
  openLoginModal: boolean;
  // other state types...
}

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    openLoginModel: false,
  },
  reducers: {
    setLoginModal: (state, action) => {
      state.openLoginModel = action.payload;
    },
  },
});

export const { setLoginModal } = appSlice.actions;

export default appSlice.reducer;
