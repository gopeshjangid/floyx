/* Instruments */
import { combineReducers } from '@reduxjs/toolkit';
import { earningsService } from './slices/earnings';
import { postServices } from './slices/posts';
import { artcileDetails } from './slices/articleDetails';
import { commentService } from './slices/comments';
import { profileService } from './slices/profile';
import { registrationService } from './slices/registration';
import { accountSettingService } from './slices/accountSetting';
import { tagServices } from './slices/tags';
import { notificationApiService } from './slices/notification';
import appReducer from './slices/appConfig';

export const reducer = combineReducers({
  [earningsService.reducerPath]: earningsService.reducer,
  [postServices.reducerPath]: postServices.reducer,
  [artcileDetails.reducerPath]: artcileDetails.reducer,
  [tagServices.reducerPath]: tagServices.reducer,
  [commentService.reducerPath]: commentService.reducer,
  [profileService.reducerPath]: profileService.reducer,
  [registrationService.reducerPath]: registrationService.reducer,
  [accountSettingService.reducerPath]: accountSettingService.reducer,
  [notificationApiService.reducerPath]: notificationApiService.reducer,
  appReducer,
});
