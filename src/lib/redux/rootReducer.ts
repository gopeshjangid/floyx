/* Instruments */
import { combineReducers } from '@reduxjs/toolkit';
import { earningsService } from './slices/earnings';
import { registrationService } from './slices/registration';

export const reducer = combineReducers({
  [earningsService.reducerPath]: earningsService.reducer,
  [registrationService.reducerPath]: registrationService.reducer,
});
