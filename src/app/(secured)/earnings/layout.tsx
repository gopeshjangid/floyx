'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ReferralCard from './_components/sideBar';
import { useMediaQuery } from '@mui/material';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMediaQuery('(max-width:480px)');
  return (
    <Box p={isMobile ? 2 : 0}>
      <Grid container columnSpacing={{ xs: 1, sm: 3, md: 3 }}>
        <Grid item xs={12} sm={8.5}>
          {children}
        </Grid>
        {/* <Grid item xs={12} sm={3}>
          <ReferralCard />
        </Grid> */}
      </Grid>
    </Box>
  );
}
