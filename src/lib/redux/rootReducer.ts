/* Instruments */
import { combineReducers } from '@reduxjs/toolkit';
import { earningsService } from './slices/earnings'

export const reducer = combineReducers({
  [earningsService.reducerPath]: earningsService.reducer,
});
