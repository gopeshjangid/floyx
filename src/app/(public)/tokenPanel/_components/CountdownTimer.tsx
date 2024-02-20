import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useCountdown } from './hooks/useCountdown';

const TimerBox = ({ children, bottomTitle }) => (
  <Box textAlign={'center'} sx={{ width: '60px', height: '80px' }}>
    <Box
      sx={{
        border: `1px solid #5798FF`,
        borderRadius: '10px',
        height: '50px',
        width: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '5px',
      }}
    >
      {children}
    </Box>
    <Typography variant="subtitle2">{bottomTitle}</Typography>
  </Box>
);

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <Stack
      gap={1}
      justifyContent={'center'}
      direction="row"
      alignItems={'center'}
    >
      <TimerBox bottomTitle="Days">{days}</TimerBox>
      <Box height="60px">:</Box>
      <TimerBox bottomTitle="Hours">
        {hours < 10 ? 0 + '' + hours : hours}
      </TimerBox>
      <Box height="60px">:</Box>
      <TimerBox bottomTitle="Minutes">
        {minutes < 10 ? 0 + '' + minutes : minutes}
      </TimerBox>
      <Box height="60px">:</Box>
      <TimerBox bottomTitle="Seconds">
        {' '}
        {seconds < 10 ? 0 + '' + seconds : seconds}
      </TimerBox>
    </Stack>
  );
};

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  return (
    <ShowCounter
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
  );
};

export default CountdownTimer;
