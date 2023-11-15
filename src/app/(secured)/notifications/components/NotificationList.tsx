import { Box, List } from '@mui/material';
import React from 'react';

import NotificationCard from '@/components/NotificationCard';
import { INotification } from '../types';

const NotificationList = ({ notifications }: { notifications: INotification[] }) => {
  return notifications.length > 0 ? (
    <List sx={{ width: '100%', p: 0 }} component="ul">
      {notifications?.map((item: INotification, index: number) => (
        <NotificationCard key={index} {...item} />
      ))}
    </List>
  ) : (
    <Box mb={5} textAlign="center">
      No Notifications
    </Box>
  );
};

export default NotificationList;
