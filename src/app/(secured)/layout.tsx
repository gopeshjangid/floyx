import React from 'react';
import DrawerAppBar from './drawer';
import Toolbar from '@mui/material/Toolbar';
import { Container } from '@mui/material';
import { getMetaData } from '@/lib/SEO';
import { Box } from '@mui/material';
import { ToastProvider } from '@/components/Toast/useToast';
import AuthProvider from '../context/AuthProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DrawerAppBar>
        <Container fixed maxWidth="lg">
          <Toolbar />
          <ToastProvider>
            <AuthProvider>{children}</AuthProvider>
          </ToastProvider>
        </Container>
      </DrawerAppBar>
    </>
  );
}

export const metadata = getMetaData({
  title: 'Floyx | Decentralized World',
  description: 'Floyx | Decentralized World',
});
