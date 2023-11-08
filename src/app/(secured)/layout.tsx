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
import ThemeSwitch from '@/components/ThemeSwitcher';
import DrawerAppBar from './sidebar';
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
          <DrawerAppBar>{children}</DrawerAppBar>
        </PageProvider>
      </body>
    </html>
  );
}
