/* Instruments */
import { combineReducers } from '@reduxjs/toolkit';
import { earningsService } from './slices/earnings';
import { profileService } from './slices/profile';

export const reducer = combineReducers({
  [earningsService.reducerPath]: earningsService.reducer,
  [profileService.reducerPath]: profileService.reducer,
});
