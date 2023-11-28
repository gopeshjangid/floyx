// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import * as React from 'react';
import { Box, Paper } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DailyIcon from '@/iconComponents/dailyTaskIcon';
import Earnings from './_components/earnings';
import EaringTabIcon from '@/iconComponents/earningTabIcon';
import { useTheme } from '@emotion/react';

const Page: React.FC = () => {
  const { palette } = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box pl="16px">
      <Box sx={{ mb: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon tabs example"
        >
          <Tab
            iconPosition="start"
            icon={<EaringTabIcon fill={palette.background.paper} />}
            label="Earnings"
            aria-label="phone"
          />
          <Tab
            iconPosition="start"
            icon={<DailyIcon fill={palette.background.paper} />}
            label="Daily Task"
            aria-label="favorite"
          />
        </Tabs>
      </Box>
      <Paper
        sx={{
          backgroundColor: palette.primary[700],
          borderRadius: '10px',
          border: '1px solid ' + palette.action['border'],
        }}
      >
        <Earnings />
      </Paper>
    </Box>
  );
};

export default Page;
