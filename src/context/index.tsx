'use client';

import React, { ReactNode } from 'react';
import { wagmiConfig, projectId } from '@/config';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { State, WagmiProvider } from 'wagmi';
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
      address: '0x53a626d2bec5Cd98e4dCb0bf694CEa5F93D58654',
    },
  },
  // chainImages: {
  //   137: 'https://my.images.com/eth.png',
  // },
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
