import React from 'react';
import { Box, List, Skeleton, Theme, styled } from '@mui/material';
const NotificationLoaderWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  padding: '0',
  // TODO: Skeleton size issue
  '& .MuiList-root': {
    padding:'0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    // padding: '9px 21px',
    '& .MuiSkeleton-root': {
      transform: 'scale(1)',
      height: 70,
    },
    [theme.breakpoints.up('md')]: {
      '& .MuiSkeleton-root': { height: 65 },
      // padding: '13px 31px',
    },
  },
}));

const NotificationLoader = () => {
  return (
    <NotificationLoaderWrapper>
      <List component="ul">
        {Array.from(new Array(5)).map((_, index) => (
          <Skeleton variant="text" animation="wave" key={index} />
        ))}
      </List>
    </NotificationLoaderWrapper>
  );
};

export default NotificationLoader;
