'use client';
import React, { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportIcon from '@mui/icons-material/Support';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/Brightness7';
import { allRoutes } from '@/constants/allRoutes';

// import '../../index.scss';

const DRAWER_WIDTH = 240;

const LINKS = [
  { text: 'Home', href: allRoutes.home, icon: HomeIcon },
  { text: 'Starred', href: '/starred', icon: ChecklistIcon },
  { text: 'Tasks', href: '/tasks', icon: ChecklistIcon },
];

const PLACEHOLDER_LINKS = [
  { text: 'Settings', icon: SettingsIcon },
  { text: 'Support', icon: SupportIcon },
  { text: 'Logout', icon: LogoutIcon },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedTheme, setTheme] = useState<string>('light');
  const pathname = usePathname();

  const onChangeTheme = (theme: string) => {
    localStorage.setItem('theme', theme);
    window.location.reload();
  };

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      setTheme(localStorage.getItem('theme')!);
    }
  }, []);

  return (
    <Box>
      <AppBar position="fixed" sx={{ zIndex: 2000 }}>
        <Toolbar sx={{ backgroundColor: 'background.paper' }}>
          <Grid container justifyContent={'space-between'} alignItems="center">
            <Grid container alignItems="center" item xs={8}>
              <DashboardIcon
                sx={{ color: '#444', mr: 2, transform: 'translateY(-2px)' }}
              />
              <Typography variant="h6" color="text.primary">
                Next.js App Router
              </Typography>
            </Grid>

            {selectedTheme === 'dark' ? (
              <DarkMode onClick={() => onChangeTheme('light')}></DarkMode>
            ) : (
              <LightMode onClick={() => onChangeTheme('dark')}></LightMode>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            top: ['48px', '56px', '64px'],
            height: 'auto',
            bottom: 0,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List>
          {LINKS.map(({ text, href, icon: Icon }) => (
            <ListItem key={href} disablePadding>
              <ListItemButton
                component={Link}
                href={href}
                className={pathname === href ? 'active-link' : ''}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ mt: 'auto' }} />
        <List>
          {PLACEHOLDER_LINKS.map(({ text, icon: Icon }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          ml: `${DRAWER_WIDTH}px`,
          mt: ['48px', '56px', '64px'],
          p: {md:3,xs:'14px'},
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
