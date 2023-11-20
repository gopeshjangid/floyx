/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import * as React from 'react';
import { Box, Card, Paper, Typography, IconButton, styled } from '@mui/material';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DailyIcon from '@/iconComponents/dailyTaskIcon';
import Earnings from './components/earnings';
// Styled components
const DashboardCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.palette.mode === 'dark' ? '0 8px 16px rgba(0, 0, 0, 0.3)' : '0 8px 16px rgba(0, 0, 0, 0.1)',
  '&:not(:last-child)': {
    marginBottom: theme.spacing(2),
  },
}));

const Item = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1.5),
  '&:last-child': {
    marginBottom: 0,
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(16),
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0.5),
}));

const SectionContent = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  color: theme.palette.text.primary,
}));

// Example usage of the styled components
const Page: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
          <Tab iconPosition="start" icon={<DailyIcon fill="" />} label="Earnings" aria-label="phone" />
          <Tab iconPosition="start" icon={<DailyIcon fill="" />} label="Daily Task" aria-label="favorite" />
        </Tabs>
      </Box>
      <Paper sx={{ background: 'background.paper', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
        <Earnings />
      </Paper>
    </Box>
  );
};

export default Page;
