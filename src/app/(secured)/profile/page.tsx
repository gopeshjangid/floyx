// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import * as React from 'react';
import { Box, Paper } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DailyIcon from '@/iconComponents/dailyTaskIcon';
import EaringTabIcon from '@/iconComponents/earningTabIcon';
import { useMediaQuery, useTheme } from '@mui/material';
import ProfileSection from './_components/profileSection';
import AboutSection from './_components/about';

const Page: React.FC = () => {
  const { palette } = useTheme();
  const isMobile = useMediaQuery('(max-width:480px)');
  const [value, setValue] = React.useState(2);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box>
        <ProfileSection />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon tabs example"
          sx={{ borderBottom: `1px solid ${palette.action.border}` }}
        >
          <Tab
            iconPosition="start"
            icon={
              <EaringTabIcon fill={value === 0 && palette.background.paper} />
            }
            label="Posts"
            aria-label="phone"
          />
          <Tab
            iconPosition="start"
            icon={<DailyIcon fill={value === 1 && palette.background.paper} />}
            label="Articles"
            aria-label="favorite"
          />
          <Tab
            iconPosition="start"
            icon={<DailyIcon fill={value === 1 && palette.background.paper} />}
            label="About"
            aria-label="favorite"
          />
        </Tabs>
      </Box>
      <Box>{value === 2 && <AboutSection />}</Box>
    </Box>
  );
};

export default Page;
