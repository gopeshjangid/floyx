/* Core */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook,
} from 'react-redux';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
import { earningsService } from './slices/earnings';
import { profileService } from './slices/profile';
import { postServices } from './slices/posts';
import { artcileDetails } from './slices/articleDetails';
import { userService } from './slices/user';
import { commentService } from './slices/comments';
import { reducer } from './rootReducer';
import { registrationService } from './slices/registration';
import { accountSettingService } from './slices/accountSetting';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(v_key, value) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    earningsService.reducerPath,
    postServices.reducerPath,
    profileService.reducerPath,
    registrationService.reducerPath,
    accountSettingService.reducerPath,
    commentService.reducerPath,
  ],
};

const persistedReducer = persistReducer(persistConfig, reducer);

let store: any;

function makeStore(initialState = {}) {
  return configureStore({
    reducer: persistedReducer,
    preloadedState: initialState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(earningsService.middleware)
        .concat(postServices.middleware)
        .concat(artcileDetails.middleware)
        .concat(userService.middleware)
        .concat(commentService.middleware)
        .concat(profileService.middleware)
        .concat(registrationService.middleware)
        .concat(accountSettingService.middleware),
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
