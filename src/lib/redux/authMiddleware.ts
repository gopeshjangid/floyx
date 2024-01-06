import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { signOut } from 'next-auth/react';

export const authMiddleware: Middleware = store => next => action => {
  if (isRejectedWithValue(action)) {
    // Accessing the status code from the error object
    const statusCode = action.error?.message?.startsWith('Rejected')
      ? parseInt(action.error.message.split(' ')[1])
      : null;
    console.log('statusCode', statusCode);
    if (statusCode === 401) {
      // Handle the 401 unauthorized error
      signOut({ redirect: false });
    }
  }

  return next(action);
};
