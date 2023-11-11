'use client';
import React, { ReactNode, useState } from 'react';
import { Box, Button, List, Tab, Tabs, Typography, useTheme } from '@mui/material';

import { SVGCheck, iconLinkMessage, iconTelegramGradient, iconUserGradient, imgUser } from '@/assets/images';
import NotificationCard from '@/components/notification-card';
import Wrapper from '@/components/wrapper';

const fakeData = [
  {
    id: '1',
    title: 'Nora Jacob commented on the post you shared',
    hour: '2 hours ago',
    img: imgUser,
    icon: iconLinkMessage,
  },
  {
    id: '2',
    title: 'Mike Egon followed you',
    hour: '2 hours ago',
    img: imgUser,
    icon: iconUserGradient,
  },
  {
    id: '3',
    title: 'Michele Reena shared your video',
    hour: '2 hours ago',
    img: imgUser,
    icon: iconTelegramGradient,
  },
];
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
  const { palette } = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
          {/* //  TODO: Creating a GLobal Component */}
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
            <Button>
              <SVGCheck />
              <span className="gradient-text">Mark all as readed</span>
            </Button>
          </Box>
        </Box>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box mb={{ md: '34px', xs: '20px' }} component="div">
          <Typography
            fontSize="16px"
            fontWeight="500"
            color={palette?.mode === 'light' ? '#2F2E41' : '#D9D9D9'}
            marginBottom="23px"
            variant="h3"
          >
            New
          </Typography>
          <List sx={{ width: '100%' }} component="ul">
            {fakeData?.map((item: NotificationCardType, index: number) => (
              <NotificationCard key={index} {...item} />
            ))}
          </List>
        </Box>
        <Box>
          <Typography fontSize="16px" fontWeight="500" color={palette?.mode === 'light' ? '#2F2E41' : '#D9D9D9'} marginBottom="23px">
            Earlier
          </Typography>
          <List sx={{ width: '100%' }}>
            {fakeData.slice(1)?.map((item: NotificationCardType, index: number) => (
              <NotificationCard key={index} {...item} />
            ))}
          </List>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </Wrapper>
  );
};

export default Notifications;
