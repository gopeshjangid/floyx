import React from 'react';
import { Box, List, Skeleton, Theme, styled } from '@mui/material';
const NotificationLoaderWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  padding: '0',
  '& .MuiList-root': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    '& .MuiSkeleton-root': {
      transform: 'scale(1)',
      height: 50,
      '&.MuiSkeleton-circular': {
        width: '50px',
        height: '50px',
      },
      '&.MuiSkeleton-text': { flex: 1 },
    },
    [theme.breakpoints.up('md')]: {
      '& .MuiList-root': {
        gap: 15,
      },
      '& .MuiSkeleton-root': {
        height: 65,
        '&.MuiSkeleton-circular': {
          width: '59px',
          height: '59px',
        },
      },
    },
  },
}));

const NotificationLoader = () => {
  return (
    <NotificationLoaderWrapper>
      <List component="ul">
        {Array.from(new Array(5)).map((_, index) => (
          <Box key={index} display="flex" gap={2}>
            <Skeleton variant="circular" animation="wave" />
            <Skeleton variant="text" animation="wave" />
          </Box>
        ))}
      </List>
    </NotificationLoaderWrapper>
  );
};

export default NotificationLoader;
