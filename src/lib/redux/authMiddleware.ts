import { Middleware } from '@reduxjs/toolkit';
import { signOut } from 'next-auth/react';

export const authMiddleware: Middleware = store => next => action => {
  if (action.type.endsWith('rejected') && action.error?.status === 401) {
    signOut({ redirect: false });
  }

  return next(action);
};
