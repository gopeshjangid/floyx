'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import PageProvider from '@/components/ThemeRegistry/PageProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { theme } = useTheme();

  return (
    <html lang="en">
      <body className={`${theme}-theme`}>
        <PageProvider>
            {children}
        </PageProvider>
      </body>
    </html>
  );
}
