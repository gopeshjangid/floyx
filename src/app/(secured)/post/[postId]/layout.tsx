import React from 'react';
import { Box } from '@mui/material';
import { getMetaData } from '@/lib/SEO';
import { cookies } from 'next/headers';

export default function RootLayout({ children }: any) {
  const cookieStore = cookies();
  const deviceType = cookieStore.get('deviceType');
  const padding = deviceType && deviceType.value === 'desktop' ? 8 : 1.5;
  return (
    <Box py={0} px={padding}>
      {children}
    </Box>
  );
}

export const metadata = getMetaData({
  title: 'Floyx | Decentralized World',
  description: 'Floyx | Decentralized World',
});
