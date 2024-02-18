import React from 'react';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import { wagmiConfig } from '@/config';
import { Web3Modal } from '@/context';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Floyx- Token Panel',
  description: 'This is a description of the site.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get('cookie')
  );
  return <Web3Modal initialState={initialState}>{children}</Web3Modal>;
}
