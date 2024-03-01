import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
export default function RemainingTimer() {
  const calculateTimeLeft = () => {
    const endTime = new Date();
    endTime.setHours(23, 59, 59, 999); // Set to the end of the current UTC day
    const difference = endTime.getTime() - new Date().getTime();

    let timeLeft = { hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = time => (time < 10 ? `0${time}` : time);

  return (
    <Box display="flex" gap={1} alignItems="center">
      <QueryBuilderIcon fontSize="small" />
      <Typography color="error" variant="body2" sx={{ marginTop: '5px' }}>
        {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
        {formatTime(timeLeft.seconds)}
      </Typography>
    </Box>
  );
}
