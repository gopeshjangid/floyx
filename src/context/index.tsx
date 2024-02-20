'use client';

import React, { ReactNode } from 'react';
import { wagmiConfig, projectId } from '@/config';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { State, WagmiProvider } from 'wagmi';
import chainImage from '@/assets/images/floyx_old_logo.jpeg';
const queryClient = new QueryClient();

if (!projectId) throw new Error('Project ID is not defined');

createWeb3Modal({
  wagmiConfig,
  projectId,
  allWallets: 'HIDE',
  themeVariables: {
    '--w3m-color-mix': '#5798FF',
  },
  themeMode: 'light',
  tokens: {
    137: {
      address: '0x7067BeBfA1720132DFb9373d65B522AfBe3A201e',
    },
  },
  chainImages: {
    137: 'https://s3.us-east-2.amazonaws.com/floyx.com/floyx-logo.jpg',
  },
});

export function Web3Modal({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
