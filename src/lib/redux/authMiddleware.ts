import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { signOut } from 'next-auth/react';
import { setLoginModal } from './slices/appConfig';

interface MyErrorPayload {
  status?: string;
  originalStatus?: number;
  data?: string;
  error?: string;
}

export const authMiddleware: Middleware = store => next => action => {
  if (isRejectedWithValue(action)) {
    // Accessing the status code from the error object
    const payload = action.payload as MyErrorPayload;
    const statusCode = action.error?.message?.startsWith('Rejected')
      ? payload?.originalStatus
      : null;
    console.log('statusCode', statusCode);
    if (statusCode === 401) {
      store.dispatch(setLoginModal(true));
      signOut({ redirect: false });
    }
  }

  return next(action);
};
