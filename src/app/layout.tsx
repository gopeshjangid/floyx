'use client';
import React from 'react';
import { Provider } from 'react-redux';
import PageProvider from '@/components/ThemeRegistry/PageProvider';
import '../index.scss';
import AuthProvider from './context/AuthProvider';
import { ToastProvider } from '@/components/Toast/useToast';
import { initializeStore, useStore } from '@/lib/redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import DefaultPageSkelton from '@/components/DefaultPageSkelton';

const initializeStoreValues = {
  earningsReducer: {},
  registerReducer: {},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useStore(initializeStoreValues);
  const persistor = persistStore(store);
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <AuthProvider>
            <Provider store={initializeStore(initializeStoreValues)}>
              <PersistGate
                loading={<DefaultPageSkelton />}
                persistor={persistor}
              >
                <PageProvider>{children}</PageProvider>
              </PersistGate>
            </Provider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
