/* Core */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook,
} from 'react-redux';
import { earningsService } from './slices/earnings';
import { profileService } from './slices/profile';
import { postServices } from './slices/posts';
import { tagServices } from './slices/tags';
import { artcileDetails } from './slices/articleDetails';
import { commentService } from './slices/comments';
import { reducer } from './rootReducer';
import { registrationService } from './slices/registration';
import { accountSettingService } from './slices/accountSetting';
import { notificationApiService } from './slices/notification';
import { authMiddleware } from './authMiddleware';

let store: any;

function makeStore(initialState) {
  return configureStore({
    reducer: reducer, // Directly using the root reducer
    preloadedState: initialState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(authMiddleware)
        .concat(earningsService.middleware)
        .concat(postServices.middleware)
        .concat(tagServices.middleware)
        .concat(artcileDetails.middleware)
        .concat(commentService.middleware)
        .concat(profileService.middleware)
        .concat(registrationService.middleware)
        .concat(accountSettingService.middleware)
        .concat(notificationApiService.middleware),
  });
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? makeStore(preloadedState);

  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/* Types */
export type ReduxStore = ReturnType<typeof makeStore>;
export type ReduxState = ReturnType<ReduxStore['getState']>;
export type ReduxDispatch = typeof store.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
