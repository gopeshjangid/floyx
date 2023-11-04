'use client';
import { SVGCheck } from '@/assets/images';
import NotificationCard from '@/components/NotificationCard';
import { Box, Button, List, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
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

const Notification = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        bgcolor: '#0B081F',
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'rgba(255, 255, 255, 0.15)',
          px: { md: '32px', xs: '20px' },
        }}
      >
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
            aria-label="basic tabs example"
          >
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
        <Box mb={{md:'34px',xs:'20px'}} component="div">
          <Typography
            fontSize="16px"
            fontWeight="500"
            color="#D9D9D9"
            marginBottom="23px"
            variant="h3"
          >
            New
          </Typography>
          <List sx={{ width: '100%' }} component="ul">
            {new Array(4).fill('').map(item => (
              <NotificationCard key={item} />
            ))}
          </List>
        </Box>
        <Box>
          <Typography
            fontSize="16px"
            fontWeight="500"
            color="#D9D9D9"
            marginBottom="23px"
          >
            Earlier
          </Typography>
          <List sx={{ width: '100%' }}>
            {new Array(2).fill('').map(item => (
              <NotificationCard key={item} />
            ))}
          </List>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  );
};

export default Notification;
