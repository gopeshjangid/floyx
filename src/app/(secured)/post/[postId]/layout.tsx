import React from 'react';
import { Box, Grid } from '@mui/material';
import { getMetaData } from '@/lib/SEO';

export default function RootLayout({ children }: any) {
  return (
    <Box mt={2} p={2}>
      <Grid container>
        <Grid item sm={10} xs={12}>
          {children}
        </Grid>
        <Grid item sm={1} xs={12}>
          &nbsp;
        </Grid>
      </Grid>
    </Box>
  );
}

export const metadata = getMetaData({
  title: 'Floyx | Decentralized World',
  description: 'Floyx | Decentralized World',
});
