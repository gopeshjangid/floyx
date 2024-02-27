import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
  openLoginModal: boolean;
  notificationCount:number;
  // other state types...
}

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    openLoginModel: false,
    notificationCount: 0
  },
  reducers: {
    setLoginModal: (state, action) => {
      state.openLoginModel = action.payload;
    },
    setNotificationCount: (state, action) => {
      state.notificationCount = action.payload
    },
  },
});

export const { setLoginModal, setNotificationCount } = appSlice.actions;

export default appSlice.reducer;
