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
import { DefaultCircularProgress } from '@/components/DefaultPageSkelton';
import '../components/ThemeRegistry/global.css';
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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-black min-h-[100dvh]">
        <ToastProvider>
          <AuthProvider>
            <Provider store={initializeStore(initializeStoreValues)}>
              <PersistGate
                loading={<DefaultCircularProgress />}
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
