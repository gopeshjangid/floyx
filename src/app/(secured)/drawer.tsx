'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { usePathname, useRouter } from 'next/navigation';
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
import { deleteCookie, getCookie } from 'cookies-next';
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
  Dialog,
  DialogTitle,
  DialogContent,
  Skeleton,
  Stack,
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
import {
  FIRST_TIME_LOGIN_USING_SOCIAL,
  FLOYX_USERNAME,
  SOCIAL_SIGNIN_DATA,
} from '@/constants';
import { INotification } from './notifications/types';
import CustomPopover from '@/components/PopoverOptions';
import LogoutIcon from '@/iconComponents/logOut';
import SettingsIcon from '@/iconComponents/settingsIcon';
import { GradientText } from '@/components/usernameLink';
//import SidebarProfileBar from '@/components/sidebarProfileInfo';
import AddPost from '@/components/Post/AddPost';
import { config } from '@/middleware';
import { CloseOutlined } from '@mui/icons-material';
import { postServices } from '@/lib/redux';
import { useDispatch } from 'react-redux';
//import GoogleTranslatorPicker from '../../components/fullArticle/googleTranslator';

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
    '.MuiListItemText-primary, span': {
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
  if (href === 'more') {
    return <CustomListItemButton {...props}>{children}</CustomListItemButton>;
  }
  return (
    <Link href={href} passHref prefetch={false}>
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
      marginTop: '-5px',
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
  const dispatch = useDispatch();
  const [drawerData, setDrawerData] = useState<IDrawerState>({
    currentLoggedUser: {
      username: getCookie(FLOYX_USERNAME)?.toString() || '',
    },
    notificationCount: 0,
    messagesCount: 0,
    notifications: [],
  });
  const pathname = usePathname();
  const session = useSession();
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:480px)');
  const theme = useTheme();
  const { palette } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openWriteDialog, setOpenWriteDialog] = useState(false);
  const isFirstTimeCookie = getCookie(FIRST_TIME_LOGIN_USING_SOCIAL) as any;
  const firstTimeUsingSocialMediaLogin = [true, 'true'].includes(
    isFirstTimeCookie
  );
  const isLoggedIn: boolean = session.status === 'authenticated';
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
  ];
  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const homeRedirect = () => {
    if (pathname === '/') {
      const container = document.querySelector('#mainContainerFeed');
      if (container) container.scrollTop = 0;
      localStorage.setItem("HomeReload", "true");
      //if (container) {window.location.reload()}
    }
    if (pathname !== '/') {
      router.push('/');
    }
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (session.data?.expires) {
      if (moment(session.data.expires).isBefore(moment())) {
        router.push(allRoutes.socialLogin);
      }
    }
  }, [session]);

  useEffect(() => {
    if (session.status === 'authenticated') {
      notificationService.publisher.on('change', getNotifications);
      notificationService.publisher.on('reload', getInitialNotification);
      messageService.reloadAll();
      messageService.publisher.on('threads', getMessageCount);
      getInitialNotification();
    }
  }, [session?.status]);

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

  const MoreButton = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClick = (event: any) => {
      setAnchorEl(prev => (prev ? null : event.currentTarget));
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
      <CustomListItemButton onClick={handleClick}>
        <ListItemIcon>
          <CustomPopover
            open={open}
            id={id}
            handleClose={handleClose}
            anchorEl={anchorEl}
            actionOriginIcon={<MoreIcon fill={theme.palette.text.primary} />}
            options={[
              {
                label: 'Settings',
                startIcon: <SettingsIcon />,
                onClick: () => router.push(`/settings/account`),
              },
              {
                label: 'Logout',
                startIcon: <LogoutIcon />,
                onClick: () => router.push(`/sign-out`),
              },
            ]}
          />
        </ListItemIcon>
        <ListItemText primary={'More'} />
      </CustomListItemButton>
    );
  };
  useEffect(() => {
    const isPrivate = config.matcher.some(path => pathname.includes(path));
    if (
      session.status !== 'loading' &&
      !isLoggedIn &&
      !firstTimeUsingSocialMediaLogin &&
      !pathname.includes('/login') &&
      isPrivate
    ) {
      deleteCookie('FLOYX_TOKEN');
      deleteCookie('next-auth.session-token');
      deleteCookie(SOCIAL_SIGNIN_DATA);
      deleteCookie(FIRST_TIME_LOGIN_USING_SOCIAL);
      router.push('/login');
    }
  }, [isLoggedIn, session.status, firstTimeUsingSocialMediaLogin]);

  const getMessageCount = () => {
    setDrawerData(prev => ({
      ...prev,
      messagesCount: messageService.unreadTotal,
    }));
  };

  const navClickHandler = href => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
    if (href === '/') {
      // dispatch(
      //   postServices.util.invalidateTags([
      //     { type: 'MainFeedList', id: 'ALL' },
      //     'MainFeedList',
      //   ])
      // );
      //Unnecessary Calling
      homeRedirect();
    }
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
            onClick={() => navClickHandler(item.href)}
          >
            <>
              <ListItemIcon sx={{ marginTop: '-5px' }}>
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
        <MoreButton />
        <ListItem>
          <Button variant="outlined" onClick={() => setOpenWriteDialog(true)}>
            <GradientText>Write Post</GradientText>{' '}
          </Button>
        </ListItem>
        <List sx={{ display: 'flex', flexDirection: 'row', margin: '0 10px' }}>
          <ListItem sx={{ padding: 0 }}>
            <ThemeSwitch />
          </ListItem>

          {/*           <ListItem sx={{padding: '15px 0px 0px 0px'}}>
            <GoogleTranslatorPicker/>
          </ListItem> */}
        </List>
      </List>
    </Box>
  );

  const getDesktopLayout = () => {
    return (
      <Grid container columnSpacing={{ sm: 2, md: 3 }}>
        <Grid item sm={3} md={3} lg={2.5}>
          {session.status === 'loading' ? (
            <Stack gap={2} mt={6} height="100vh" p={2}>
              <Skeleton variant="rectangular" width="100%" height="100vh" />
            </Stack>
          ) : isLoggedIn ? (
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
              {/* <SidebarProfileBar /> */}
            </Paper>
          ) : (
            <>&nbsp;</>
          )}
        </Grid>
        <Grid item sm={8} md={8} lg={8.5}>
          {children}
        </Grid>
      </Grid>
    );
  };

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
                <MenuIcon
                  sx={{
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.common.white
                        : theme.palette.common.black,
                  }}
                />
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
            {/* <Box pl={2}>
              <SidebarProfileBar />
            </Box> */}
          </Drawer>
        )}
        {!isMobile ? (
          getDesktopLayout()
        ) : (
          <Paper>
            <Toolbar />
            {children}
          </Paper>
        )}
      </nav>
      <Dialog
        open={openWriteDialog}
        onClose={() => setOpenWriteDialog(false)}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          sx: { background: palette.background.default, width: '100%' },
        }}
      >
        <Stack direction="row" justifyContent={'space-between'}>
          <DialogTitle sx={{ textAlign: 'center', paddingBottom: 0 }}>
            Create Post
          </DialogTitle>
          <IconButton onClick={() => setOpenWriteDialog(false)}>
            <CloseOutlined />
          </IconButton>
        </Stack>
        <DialogContent sx={{ m: 0, paddingTop: 0 }}>
          <AddPost writeDialog={true} setOpenWriteDialog={setOpenWriteDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
}
