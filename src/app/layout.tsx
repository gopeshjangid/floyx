import React from 'react';

import '../index.scss';
import { ToastProvider } from '@/components/Toast/useToast';
import AuthProvider from './context/AuthProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
