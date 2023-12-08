'use client';
import React from 'react';
import { Provider } from 'react-redux';
import PageProvider from '@/components/ThemeRegistry/PageProvider';
import '../index.scss';
import AuthProvider from './context/AuthProvider';
import { ToastProvider } from '@/components/Toast/useToast';
import { initializeStore } from '@/lib/redux';
const initializeStoreValues = {
  earningsReducer: {},
  registerReducer: {},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <AuthProvider>
            <Provider store={initializeStore(initializeStoreValues)}>
              <PageProvider>{children}</PageProvider>
            </Provider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
