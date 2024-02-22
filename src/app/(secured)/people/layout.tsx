'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ReferralCard from './_components/sideBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
