import React from 'react';
import DrawerAppBar from './drawer';
import Toolbar from '@mui/material/Toolbar';

import { getMetaData } from '@/lib/SEO';
import { Box } from '@mui/material';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box display="flex" minHeight="100vh">
      <DrawerAppBar>
      {/* TODO: container width */}
      <Box width="100%" paddingInline={2.5}>
        <Toolbar />
        {children}
      </Box>
      </DrawerAppBar>
    </Box>
  );
}

export const metadata = getMetaData({
  title: 'Floyx | Decentralized World',
  description: 'Floyx | Decentralized World',
});
