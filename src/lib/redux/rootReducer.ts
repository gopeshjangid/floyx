/* Instruments */
import { combineReducers } from '@reduxjs/toolkit';
import { earningsService } from './slices/earnings';
import { postServices } from './slices/posts';
import { userDetails } from './slices/userDetails';
import { artcileDetails } from './slices/articleDetails';
import { commentList } from './slices/articleCommentList';
import { articleTotalEarnings } from './slices/articleTotalEarnings';
import { profileService } from './slices/profile';
import { registrationService } from './slices/registration';
import { accountSettingService } from './slices/accountSetting';

export const reducer = combineReducers({
  [earningsService.reducerPath]: earningsService.reducer,
  [postServices.reducerPath]: postServices.reducer,
  [userDetails.reducerPath]: userDetails.reducer,
  [artcileDetails.reducerPath]: artcileDetails.reducer,
  [commentList.reducerPath]: commentList.reducer,
  [articleTotalEarnings.reducerPath]: articleTotalEarnings.reducer,
  [profileService.reducerPath]: profileService.reducer,
  [registrationService.reducerPath]: registrationService.reducer,
  [accountSettingService.reducerPath]: accountSettingService.reducer,
});
