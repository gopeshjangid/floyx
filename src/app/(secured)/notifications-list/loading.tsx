import { List, Skeleton } from '@mui/material';
import React from 'react';

const NotificationLoader = () => {
  return (
    <List sx={{ width: '100%' }} component="ul">
      {Array.from(new Array(8)).map((_, index) => (
        <Skeleton key={index} height={90} />
      ))}
    </List>
  );
};

export default NotificationLoader;
