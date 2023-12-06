/* Instruments */
import { combineReducers } from '@reduxjs/toolkit';
import { earningsService } from './slices/earnings';
import { postServices } from './slices/posts';
import { artcileDetails } from './slices/articleDetails';
import { userService } from './slices/user';
 
export const reducer = combineReducers({
  [earningsService.reducerPath]: earningsService.reducer,
  [postServices.reducerPath]: postServices.reducer,
  [artcileDetails.reducerPath]: artcileDetails.reducer,
  [userService.reducerPath]: userService.reducer
});
