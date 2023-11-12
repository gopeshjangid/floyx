import { List, Skeleton } from '@mui/material';
import React from 'react';

const NotificationLoader = () => {
  // TODO: improve
  return (
    <List sx={{ width: '100%' }} component="ul">
      {Array.from(new Array(5)).map((_, index) => (
        <Skeleton animation="wave" key={index} height={90} />
      ))}
    </List>
  );
};

export default NotificationLoader;
