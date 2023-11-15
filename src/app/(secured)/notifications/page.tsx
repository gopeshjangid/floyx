'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Tab, Tabs, useTheme } from '@mui/material';

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

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: { md: 4, xs: 2 } }}>{children}</Box>}
    </div>
  );
}

const Notifications = () => {
  const toast = useToast();
  const { palette } = useTheme();
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
  const unReadNotifications = notificationData.notifications.filter((x: INotification) => x.state === 1);

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
        notificationCount: res.value.data.filter((x: any) => x.state == 1).length,
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
      return new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime();
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
    const response = await notificationService.markAllAsRead(notificationData.notifications);
    if (!response?.success) {
      toast.error('Error marking all as read');
    }

    setMarkAllAsReadLoading(false);
  };

  return (
    <Wrapper>
      <Box
        sx={{
          borderBottom: 1,
          border: `1px solid ${palette?.mode === 'light' ? '#E7F0FC' : 'rgba(255, 255, 255, 0.15)'}`,
          px: { md: '32px', xs: '20px' },
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap="10px">
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="All" />
            <Tab label="Unread" />
          </Tabs>

          <Box
            sx={{
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
            }}
          >
            <Button onClick={markAllAsRead}>
              {markAllAsReadLoading ? <CircularProgress size={20} color="inherit" /> : <SVGCheck />}
              <span className="gradient-text">Mark all as read</span>
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          '& .MuiBox-root': {
            padding: '0',
            paddingTop: { md: '30px', xs: '25px' },
          },
        }}
      >
        <CustomTabPanel value={value} index={0}>
          {isLoading ? <NotificationLoader /> : <NotificationList notifications={notificationData.notifications} />}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {isLoading ? <NotificationLoader /> : <NotificationList notifications={unReadNotifications} />}
        </CustomTabPanel>
      </Box>
    </Wrapper>
  );
};

export default Notifications;
