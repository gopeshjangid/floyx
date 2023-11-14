'use client';
import React from 'react';
import { useTheme } from 'next-themes';

import PageProvider from '@/components/ThemeRegistry/PageProvider';
import '../index.scss';
import AuthProvider from './context/AuthProvider';
import { ToastProvider } from '@/components/Toast/useToast';

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
            <PageProvider>{children}</PageProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
