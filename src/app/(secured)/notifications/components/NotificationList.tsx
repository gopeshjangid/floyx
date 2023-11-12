import { List } from '@mui/material';
import React from 'react';

import NotificationCard from '@/components/NotificationCard';
import { INotification } from '../types';

const NotificationList = ({ notifications }: { notifications: INotification[] }) => {
  return notifications.length > 0 ? (
    <List sx={{ width: '100%' }} component="ul">
      {notifications?.map((item: INotification, index: number) => (
        <NotificationCard key={index} {...item} />
      ))}
    </List>
  ) : (
    // TODO: proper styles
    <div>No notifications</div>
  );
};

export default NotificationList;
