import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
  openLoginModal: boolean;
  notificationCountState:number;
  // other state types...
}

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    openLoginModel: false,
    notificationCountState: 0
  },
  reducers: {
    setLoginModal: (state, action) => {
      state.openLoginModel = action.payload;
    },
    setNotificationCount: (state, action) => {
      state.notificationCountState = action.payload
    },
  },
});

export const { setLoginModal, setNotificationCount  } = appSlice.actions;

export default appSlice.reducer;
