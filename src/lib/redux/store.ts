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
import storage from 'redux-persist/lib/storage';

/* Instruments */
import { reducer } from './rootReducer';
import { middleware } from './middleware';

const persistConfig = {
  key: 'floyxData',
  storage,
  whitelist: ['floyx_data'], // place to select which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, reducer);

let store: any;

function makeStore(initialState = {}) {
  return configureStore({
    reducer: persistedReducer, // corrected line
    preloadedState: initialState, // corrected line
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(middleware),
  });
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? makeStore(preloadedState);

   if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
};


export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/* Types */
export type ReduxStore = ReturnType<typeof makeStore>;
export type ReduxState = ReturnType<ReduxStore['getState']>;
export type ReduxDispatch =  typeof store.dispatch;
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
