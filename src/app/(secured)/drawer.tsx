'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton, {
  ListItemButtonProps,
} from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import { useSession } from 'next-auth/react';
import moment from 'moment';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import {
  useTheme,
  useMediaQuery,
  Grid,
  Toolbar,
  ListItemIcon,
  ListItemSecondaryAction,
  styled,
  Button,
} from '@mui/material';

import FloyxImage from '@/iconComponents/floyxIcon';
import HomeIcon from '@/iconComponents/homeIcon';
import MessageIcon from '@/iconComponents/messageIcon';
import NotificationIcon from '@/iconComponents/notificationIcon';
import WalletIcon from '@/iconComponents/walletIcon';
import MoreIcon from '@/iconComponents/moreIcon';
import ProfileIcon from '@/iconComponents/profileIcon';
import SearchIcon from '@/iconComponents/searchIcon';
import ThemeSwitch from '@/components/ThemeSwitcher';
import { allRoutes } from '@/constants/allRoutes';
import { notificationService } from '@/lib/services/new/notificationService';
import { messageService } from '@/lib/services/new/messageService';
import { FLOYX_USERNAME } from '@/constants';
import { INotification } from './notifications/types';
import CustomPopover from '@/components/PopoverOptions';
import LogoutIcon from '@/iconComponents/logOut';
import SettingsIcon from '@/iconComponents/settingsIcon';
import { AddCircle } from '@mui/icons-material';
import { GradientText } from '@/components/usernameLink';
import SidebarProfileBar from '@/components/sidebarProfileInfo';

const drawerWidth = 240;

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  color:
    theme.palette.mode === 'light'
      ? theme.palette.common.black
      : theme.palette.common.white,
  '&:hover': {
    background: 'linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF)',
    color:
      theme.palette.mode === 'light'
        ? theme.palette.common.black
        : theme.palette.common.white,
    '.MuiListItemIcon-root': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.common.white
          : theme.palette.common.black,
    },
    '.MuiListItemText-primary': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.common.white
          : theme.palette.common.black,
    },
    '& svg': {
      stroke:
        theme.palette.mode === 'light'
          ? theme.palette.common.white
          : theme.palette.common.black,
    },
  },
}));

interface LinkListItemButtonProps
  extends Omit<ListItemButtonProps, 'component'> {
  href: string;
}

const LinkListItemButton: React.FC<LinkListItemButtonProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <Link href={href} passHref>
      <CustomListItemButton {...props}>{children}</CustomListItemButton>
    </Link>
  );
};

const CountWrapper = ({ count }: { count: number }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: 'primary.main',
      color: 'background.default',
      fontSize: '10px',
      fontWeight: 'bold',
    }}
  >
    {count}
  </Box>
);

interface IDrawerState {
  currentLoggedUser: {
    username: string;
  };
  notificationCount: number;
  messagesCount: number;
  notifications: INotification[];
}

export default function DrawerAppBar({ children }: { children: ReactNode }) {
  const [drawerData, setDrawerData] = useState<IDrawerState>({
    currentLoggedUser: {
      username: getCookie(FLOYX_USERNAME)?.toString() || '',
    },
    notificationCount: 0,
    messagesCount: 0,
    notifications: [],
  });
  const session = useSession();
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:480px)');
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

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
      label: 'More',
      href: '',
      icon: (fill: string) => (
        <CustomPopover
          actionOriginIcon={<MoreIcon fill={fill} />}
          options={[
            {
              label: 'Settings',
              startIcon: <SettingsIcon />,
              onClick: () => router.push(`/settings/account`),
            },
            {
              label: 'Logout',
              startIcon: <LogoutIcon />,
              onClick: () => router.push(`/api/auth/signout`),
            },
          ]}
        />
      ),
    },
    {
      label: '',
      href: '/profile',
      icon: () => (
        <Button variant="outlined" startIcon={<AddCircle />}>
          <GradientText>Write Post</GradientText>{' '}
        </Button>
      ),
    },
  ];
  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const homeRedirect = () => {
    router.push('/');
  };

  useEffect(() => {
    if (session.data?.expires) {
      if (moment(session.data.expires).isBefore(moment())) {
        router.push(allRoutes.socialLogin);
      }
    }
  }, [session]);

  useEffect(() => {
    notificationService.publisher.on('change', getNotifications);
    notificationService.publisher.on('reload', getInitialNotification);
    messageService.publisher.on('threads', getMessageCount);
    getInitialNotification();
  }, []);

  const getNotifications = (data: INotification[]) => {
    setDrawerData(prev => ({
      ...prev,
      notifications: data,
      notificationCount: data.filter(x => x?.state == 1).length,
    }));
  };

  const getInitialNotification = async () => {
    const res: any = await notificationService.reloadAll();
    if (res?.value?.code === 'success') {
      setDrawerData(prev => ({
        ...prev,
        notifications: res.value.data,
        notificationCount: res.value.data.filter((x: any) => x.state == 1)
          .length,
      }));
    }
  };

  const getMessageCount = () => {
    setDrawerData(prev => ({
      ...prev,
      messagesCount: messageService.unreadTotal,
    }));
  };

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
          <LinkListItemButton
            key={index + 'list-item-nav-item'}
            href={
              item.label === 'Profile'
                ? `${item.href}/${session.data?.user?.username}`
                : item.href
            }
          >
            <>
              <ListItemIcon>
                {item?.icon && item?.icon(theme.palette.text.primary)}
              </ListItemIcon>
              <ListItemText primary={item.label} />
              <ListItemSecondaryAction>
                {item.label === 'Notifications' &&
                drawerData.notificationCount > 0 ? (
                  <CountWrapper count={drawerData.notificationCount} />
                ) : item.label === 'Messages' &&
                  drawerData.messagesCount > 0 ? (
                  <CountWrapper count={drawerData.messagesCount} />
                ) : null}
              </ListItemSecondaryAction>
            </>
          </LinkListItemButton>
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
                width: drawerWidth + 30,
                background: theme.palette.background.default,
              },
            }}
          >
            {drawer}
            <Box pl={2}>
              <SidebarProfileBar />
            </Box>
          </Drawer>
        )}
        {!isMobile ? (
          <Grid container columnSpacing={{ sm: 2, md: 3 }}>
            <Grid item sm={3} md={4} lg={2}>
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  width: '100%',
                  paddingTop: 1,
                  pl: 1,
                  bgcolor: 'primary.700',
                }}
              >
                {drawer}
                <SidebarProfileBar />
              </Paper>
            </Grid>
            <Grid item sm={9} md={8} lg={10}>
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
