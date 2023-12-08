'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import { useSession } from 'next-auth/react';
import moment from 'moment';

import FloyxImage from '@/iconComponents/floyxIcon';
import HomeIcon from '@/iconComponents/homeIcon';
import MessageIcon from '@/iconComponents/messageIcon';
import NotificationIcon from '@/iconComponents/notificationIcon';
import WalletIcon from '@/iconComponents/walletIcon';
import MoreIcon from '@/iconComponents/moreIcon';
import ProfileIcon from '@/iconComponents/profileIcon';
import SearchIcon from '@/iconComponents/searchIcon';
import ThemeSwitch from '@/components/ThemeSwitcher';
import Link from 'next/link';
import {
  useTheme,
  useMediaQuery,
  Grid,
  Toolbar,
  ListItemIcon,
} from '@mui/material';
import { allRoutes } from '@/constants/allRoutes';

const drawerWidth = 240;
const navItems = [
  {
    label: 'Home',
    href: '/',
    icon: (fill: string) => <HomeIcon stroke={fill} />,
  },
  {
    label: 'Notifications',
    href: '/notifications',
    icon: (fill: string) => <NotificationIcon stroke={fill} />,
  },
  {
    label: 'Messages',
    href: '/inbox',
    icon: (fill: string) => <MessageIcon stroke={fill} />,
  },
  {
    label: 'Search',
    href: '/people',
    icon: (fill: string) => <SearchIcon stroke={fill} />,
  },
  {
    label: 'Wallet',
    href: '/earnings',
    icon: (fill: string) => <WalletIcon stroke={fill} />,
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: (fill: string) => <ProfileIcon stroke={fill} />,
  },
  {
    label: 'Settings',
    href: '/settings/account',
  },
  {
    label: 'More',
    href: '/more',
    icon: (fill: string) => <MoreIcon fill={fill} />,
  },
];

export default function DrawerAppBar({ children }) {
  const session = useSession();
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:480px)');
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const homeRedirect = () => {
    router.push('/');
  };

  React.useEffect(() => {
    if (session.data?.expires) {
      if (moment(session.data.expires).isBefore(moment())) {
        router.push(allRoutes.socialLogin);
      }
    }
  }, [session]);

  const drawer = (
    <Box>
      <Box sx={{ padding: 1, background: 'inherit', paddingBottom: 2 }}>
        <IconButton onClick={homeRedirect}>
          <FloyxImage
            fill={
              theme.palette.mode === 'dark'
                ? theme.palette.common.white
                : theme.palette.common.black
            }
          />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item, index) => (
          <ListItemButton key={index} LinkComponent={Link} href={item.href}>
            <ListItemIcon>
              {item?.icon && item?.icon(theme.palette.text.primary)}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}

        <ListItem>
          <ThemeSwitch />
        </ListItem>
      </List>
    </Box>
  );

  const container = undefined;
  return (
    <>
      {isMobile && (
        <AppBar
          sx={{
            backgroundColor: 'background.default',
          }}
          component="nav"
          position="absolute"
          elevation={0}
        >
          <Box
            sx={{
              padding: 1,
              height: '50px',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ width: '19%', height: '100%' }}>
              <IconButton onClick={homeRedirect}>
                <FloyxImage
                  fill={
                    theme.palette.mode === 'dark'
                      ? theme.palette.common.white
                      : theme.palette.common.black
                  }
                />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </AppBar>
      )}
      <nav>
        {isMobile && mobileOpen && (
          <Drawer
            container={container}
            variant={mobileOpen ? 'temporary' : 'permanent'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              flexShrink: 0,
              display: {
                xs: !mobileOpen ? 'none' : 'block',
                sm: !mobileOpen ? 'block' : 'block',
              },
              height: '100%',
              '& .MuiDrawer-paper': {
                borderWidth: 0,
                position: 'relative',
                boxSizing: 'border-box',
                width: drawerWidth,
                background: theme.palette.background.default,
              },
            }}
          >
            {drawer}
          </Drawer>
        )}
        {!isMobile ? (
          <Grid container columnSpacing={{ sm: 2, md: 3 }}>
            <Grid item sm={3} md={3} lg={2}>
              <Paper
                elevation={0}
                sx={{
                  height: '100vh',
                  width: '100%',
                  paddingTop: 1,
                  pl: 1,
                  bgcolor: 'primary.700',
                }}
              >
                {drawer}
              </Paper>
            </Grid>
            <Grid item sm={9} md={9} lg={10}>
              {children}
            </Grid>
          </Grid>
        ) : (
          <Paper>
            <Toolbar />
            {children}
          </Paper>
        )}
      </nav>
    </>
  );
}
