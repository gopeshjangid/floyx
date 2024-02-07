'use client';
import React from 'react';
import { Box } from '@mui/material';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import { config } from '@/config';
import ContextProvider from './_components/context';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, document.cookie);
  return (
    <html lang="en">
      <body>
        <ContextProvider initialState={initialState}>
          <Box>{children}</Box>
        </ContextProvider>
      </body>
    </html>
  );
}
