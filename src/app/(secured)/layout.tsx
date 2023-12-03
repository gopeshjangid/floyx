import React from 'react';
import DrawerAppBar from './drawer';
import Grid from '@mui/material/Grid';

import { getMetaData } from '@/lib/SEO';
import { Box } from '@mui/material';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box component="main" display="flex" minHeight="100vh">
      <DrawerAppBar>{children}</DrawerAppBar>
    </Box>
  );
}

export const metadata = getMetaData({
  title: 'Floyx | Decentralized World',
  description: 'Floyx | Decentralized World',
});
