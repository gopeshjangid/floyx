/* Instruments */
import { combineReducers } from '@reduxjs/toolkit';
import { counterSlice } from './slices'

export const reducer = combineReducers({
  counter: counterSlice.reducer,
});
