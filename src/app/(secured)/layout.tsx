import React from 'react';
import DrawerAppBar from './drawer';
import { Box } from '@mui/material';
import { getMetaData } from '@/lib/SEO';
import { cookies } from 'next/headers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
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
