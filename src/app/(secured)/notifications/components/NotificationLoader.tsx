import { List, Skeleton } from '@mui/material';
import React from 'react';

const NotificationLoader = () => {
  // TODO: improve
  return (
    <List
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        padding: { md: '13px 31px', xs: '9px 21px' },
        '& .MuiSkeleton-root': {
          transform: 'scale(1)',
          height: {
            md: 65,
            xs: 70,
          },
        },
      }}
      component="ul"
    >
      {Array.from(new Array(5)).map((_, index) => (
        <Skeleton variant="text" animation="wave" key={index} />
      ))}
    </List>
  );
};

export default NotificationLoader;
