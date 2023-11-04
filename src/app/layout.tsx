'use client';
import React, { useEffect, useState } from 'react';

import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import '../index.scss';
import AuthProvider from './context/AuthProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedTheme, setTheme] = useState('light');

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      setTheme(localStorage.getItem('theme')!);
    }
  }, []);

  return (
    <html lang="en">
      <body className={`${selectedTheme}-theme`}>
        <AuthProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
