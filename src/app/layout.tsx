'use client';
import React, { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useTheme } from 'next-themes';
import PageProvider from '@/components/ThemeRegistry/PageProvider';
import '../index.scss';
import ThemeSwitch from '@/components/ThemeSwitcher';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { theme } = useTheme();

  return (
    <html lang="en">
      <body className={`${theme}-theme`}>
        <PageProvider>
          <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar sx={{ backgroundColor: 'background.paper' }}>
              <Grid
                container
                justifyContent={'space-between'}
                alignItems="center"
              >
                <Grid container alignItems="center" item xs={8}>
                  <DashboardIcon
                    sx={{ color: '#444', mr: 2, transform: 'translateY(-2px)' }}
                  />
                   <ThemeSwitch />
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
      
          <Box
            component="main"
            sx={{
              mt: '88px',
              pt: '33px',
            }}
          >
            {children}
          </Box>
        </PageProvider>
      </body>
    </html>
  );
}
