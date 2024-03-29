'use client';
import React, { ReactNode, Suspense, useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Skeleton,
  Tab,
  Tabs,
  styled,
} from '@mui/material';
import { Theme } from '@mui/system';

import Wrapper from '@/components/wrapper';
import { tokenService } from '@/lib/services/new/tokenService';
import { messageService } from '@/lib/services/new/messageService';
import { authService } from '@/lib/services/new/authService';
import NotificationList from './components/NotificationList';
import { SVGCheck } from '@/assets/images';
import { notificationService } from '@/lib/services/new/notificationService';
import { INotification, INotificationData } from './types';
import { useToast } from '@/components/Toast/useToast';
import NotificationLoader from './components/NotificationLoader';
import RecentArticles from '@/components/PopularToday';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationCount } from '@/lib/redux/slices/appConfig';
import { ReduxState } from '@/lib/redux';

const SectionSkeleton = () => (
  <Skeleton variant="rectangular" width="100%" height="200px" />
);

const NotificationsWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  borderBottom: 1,
  paddingInline: '20px',
  border: `1px solid ${
    theme.palette?.mode === 'light' ? '#E7F0FC' : 'rgba(255, 255, 255, 0.15)'
  }`,
  '& .notifications-header': {
    '& .MuiButton-root': {
      padding: '0',
      color: '#A85CFF',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '24px',
      textTransform: 'capitalize',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
  },
  '& .notifications-content': {
    '& .MuiBox-root': {
      padding: '0',
      paddingTop: '25px',
    },
  },
  [theme.breakpoints.up('md')]: {
    paddingInline: '32px',
    '& .notifications-content': {
      '& .MuiBox-root': {
        paddingTop: '30px',
      },
    },
  },
}));
interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { md: 4, xs: 2 } }}>{children}</Box>}
    </div>
  );
}

const Notifications = () => {
  const dispatch = useDispatch();
  const { notificationCountState } = useSelector(
    (state: ReduxState) => state.appReducer
  );
  const toast = useToast();
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationPageData, setNotificationPageData] = useState({
    threads: [],
    currentLoggedUser: {},
    currentIndex: -1,
    users: [],
    dataLoading: true,
    ifUserBlock: false,
    mounted: false,
  });
  const [notificationData, setNotificationData] = useState<INotificationData>({
    CRUDopen: false,
    notifications: [],
  });
  const [markAllAsReadLoading, setMarkAllAsReadLoading] = useState(false);
  const unReadNotifications = notificationData.notifications.filter(
    (x: INotification) => x.state === 1
  );

  useEffect(() => {
    tokenService.onNewToken.on('USER', setCurrenUser);
    messageService.publisher.on('threads', loadAll);
    tokenService.emmitCurrentUser();
    notificationService.publisher.on('reload', getInitialNotification);

    authService.initHistory(history);
    return () => {
      tokenService.onNewToken.off('USER', setCurrenUser);
      messageService.publisher.off('threads', loadAll);
      notificationService.publisher.off('reload', getInitialNotification);
    };
  }, []);

  useEffect(() => {
    getInitialNotification();
  }, []);

  const getInitialNotification = async () => {
    setIsLoading(true);
    const res: any = await notificationService.reloadAll();
    setIsLoading(false);
    if (res?.value?.code === 'success') {
      setNotificationData({
        ...notificationData,
        notifications: res.value.data,
        notificationCount: res.value.data.filter((x: any) => x.state == 1)
          .length,
      });
    } else {
      toast.error('Error getting notifications');
    }
  };

  const setCurrenUser = (data: any) => {
    if (notificationPageData.mounted) {
      setNotificationPageData(prev => ({
        ...prev,
        currentLoggedUser: data,
      }));
    } else {
      setNotificationPageData(prev => ({
        ...prev,
        currentLoggedUser: data,
      }));
    }
  };

  const loadAll = (data: any[]) => {
    saveConversations(data);
    if (notificationPageData.mounted) {
      setNotificationPageData(prev => ({
        ...prev,
        dataLoading: false,
      }));
    } else {
      setNotificationPageData(prev => ({
        ...prev,
        dataLoading: false,
      }));
    }
  };

  const saveConversations = (threads: any) => {
    threads.sort(function (a: any, b: any) {
      return (
        new Date(b.lastMessageDate).getTime() -
        new Date(a.lastMessageDate).getTime()
      );
    });

    setNotificationPageData(prev => ({
      ...prev,
      threads,
    }));
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const markAllAsRead = async () => {
    setMarkAllAsReadLoading(true);
    const response = await notificationService.markAllAsRead(
      notificationData.notifications
    );
    if (!response?.success) {
      toast.error('Error marking all as read');
    }else{
      // for update drawer notification count also
      dispatch(setNotificationCount(notificationCountState+1));
    }

    setMarkAllAsReadLoading(false);
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={8} lg={9}>
          <Wrapper>
            <NotificationsWrapper>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
                gap="10px"
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="notification tabs"
                >
                  <Tab label="All" />
                  <Tab label="Unread" />
                </Tabs>

                <Box className="notifications-header">
                  <Button onClick={markAllAsRead}>
                    {markAllAsReadLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <SVGCheck />
                    )}
                    <span className="gradient-text">Mark all as read</span>
                  </Button>
                </Box>
              </Box>
            </NotificationsWrapper>
            <Box className="notifications-content">
              <CustomTabPanel value={value} index={0}>
                {isLoading ? (
                  <NotificationLoader />
                ) : (
                  <NotificationList
                    notifications={notificationData.notifications}
                  />
                )}
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                {isLoading ? (
                  <NotificationLoader />
                ) : (
                  <NotificationList notifications={unReadNotifications} />
                )}
              </CustomTabPanel>
            </Box>
          </Wrapper>
        </Grid>
        <Grid paddingTop={2} item xs={12} sm={4} lg={3} paddingRight={1}>
          <Suspense fallback={<SectionSkeleton />}>
            <RecentArticles />
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Notifications;
