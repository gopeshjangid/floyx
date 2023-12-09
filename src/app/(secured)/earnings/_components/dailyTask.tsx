/* eslint-disable @typescript-eslint/no-unused-vars */
/*  react/no-unescaped-entities */
'use client';
import * as React from 'react';
import { Box, Typography, Stack, useMediaQuery } from '@mui/material';
import DailTaskSTatusIcon from '@/iconComponents/dailyTaskStatusIcon';

// Example usage of the styled components
const DailyTask: React.FC = () => {
  //const [_value, setValue] = React.useState(0);
  const isMobile = useMediaQuery('(max-width:480px)');
  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };

  const items = [1, 2, 3];
  return (
    <Box sx={{ p: isMobile ? 0 : 3, borderColor: 'rgba(255, 255, 255, 0.15)' }}>
      <Box p={1}>
        <Stack gap={2} alignItems="flex-start" display="flex" direction="row">
          <DailTaskSTatusIcon />
          <Typography variant="body2" color="textPrimary">
            Every 24 hours the daily task system is reset. Those task you
            don&apos;t finish disappear and new ones appear. After restarting,
            the tasks will reappear at different times. Check the tab and
            don&apos;t miss an opportunity to earn! Good luck!
          </Typography>
        </Stack>
      </Box>
      <Box p={2} textAlign="center" bgcolor="background.default">
        <Stack direction="row" spacing={{ xs: 1, sm: 3, md: 4 }}>
          <Typography variant="body2" color="textPrimary">
            Remaining Time
          </Typography>
          <Typography variant="body2" color="textPrimary">
            Name & Task Description
          </Typography>
          <Typography variant="body2" color="textPrimary">
            Status
          </Typography>
          <Typography variant="body2" color="textPrimary">
            Reward
          </Typography>
        </Stack>
      </Box>
      <Box p={2} textAlign="center" bgcolor="background.paper">
        {items.map((item, index) => (
          <Stack
            key={'item-' + index}
            direction="row"
            spacing={{ xs: 1, sm: 3, md: 4 }}
          >
            <Typography variant="body2" color="textPrimary">
              Remaining Time
            </Typography>
            <Typography variant="body2" color="textPrimary">
              Name & Task Description
            </Typography>
            <Typography variant="body2" color="textPrimary">
              Status
            </Typography>
            <Typography variant="body2" color="textPrimary">
              Reward
            </Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

export default DailyTask;
