import { Middleware } from '@reduxjs/toolkit';
import { signOut } from 'next-auth/react';
import { setLoginModal } from './slices/appConfig';


export const authMiddleware: Middleware = store => next => (action: any) => {
 if (action.error && action.error.message === 'Rejected' && action.meta.arg.type === 'mutation') {
  const response = action.meta.baseQueryMeta?.response;
  if (response?.status === 401) {
    store.dispatch(setLoginModal(true));
    console.log("login modal open")
    signOut({ redirect: false });
  }
}

  return next(action);
};
