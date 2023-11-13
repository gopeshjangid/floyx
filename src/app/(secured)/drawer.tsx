'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';

import useMediaQuery from '@mui/material/useMediaQuery';
import FloyxImage from '@/images/floyxIcon';
import ThemeSwitch from '@/components/ThemeSwitcher';
import Link from 'next/link';
import { useTheme } from '@mui/material';

const drawerWidth = 240;
const navItems = ['Home', 'Notifications', 'Messages', 'Search', 'Earnings', 'Profile', 'More'];

export default function DrawerAppBar() {
  const isMobile = useMediaQuery('(max-width:480px)');
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ padding: 1, background: 'inherit', paddingBottom: 2 }}>
        <FloyxImage fill={theme.palette.primary[theme.palette.mode]} />
      </Box>
      <List>
        <ListItem>
          <ThemeSwitch />
        </ListItem>
        {navItems.map(item => (
          <ListItemButton sx={{ textAlign: 'center' }} key={item} LinkComponent={Link} href={item.toLowerCase()}>
            <ListItemText primary={item} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  const container = undefined;
  return (
    <>
      <AppBar component="nav" position="absolute" color="inherit" elevation={0} sx={{ display: { xs: 'block', sm: 'none', md: 'none' } }}>
        <Box
          sx={{
            background: theme.palette.mode === 'light' ? '#fff' : 'inherit',
            padding: 1,
            height: '50px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ width: '19%', height: '100%' }}>
            <FloyxImage fill={theme.palette.primary[theme.palette.mode]} />
          </Box>
          <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Box>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant={mobileOpen ? 'temporary' : 'permanent'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            flexShrink: 0,
            display: { xs: !mobileOpen && 'none', sm: !mobileOpen && 'block' },
            height: '100%',
            '& .MuiDrawer-paper': {
              borderWidth: 0,
              position: 'relative',
              backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.paper,
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}
