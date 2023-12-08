import React from 'react';
import DrawerAppBar from './drawer';
import { Box } from '@mui/material';
import { getMetaData } from '@/lib/SEO';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box component="main" minHeight="100vh">
      <DrawerAppBar>{children}</DrawerAppBar>
    </Box>
  );
}

export const metadata = getMetaData({
  title: 'Floyx | Decentralized World',
  description: 'Floyx | Decentralized World',
});
