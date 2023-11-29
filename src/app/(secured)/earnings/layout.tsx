import React from 'react';
import { getMetaData } from '@/lib/SEO';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ReferralCard from './_components/sideBar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Grid container columnSpacing={8}>
        <Grid item xs={12} sm={8}>
          {children}
        </Grid>
        <Grid item xs={12} sm={4}>
           <ReferralCard />
        </Grid>
      </Grid>
    </Box>
  );
}

export const metadata = getMetaData({
  title: 'Floyx | Decentralized World',
  description: 'Floyx | Decentralized World',
});
