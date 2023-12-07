'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import { Provider } from 'react-redux';
import PageProvider from '@/components/ThemeRegistry/PageProvider';
import '../index.scss';
import AuthProvider from './context/AuthProvider';
import { ToastProvider } from '@/components/Toast/useToast';
import { initializeStore } from '@/lib/redux';
const initializeStoreValues = {
  earningsReducer: {},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <html lang="en">
      <body className={`${theme}-theme`}>
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
