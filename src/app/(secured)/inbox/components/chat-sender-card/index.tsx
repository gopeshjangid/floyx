import { Box, Typography, useTheme } from '@mui/material';
import moment from 'moment';
import React from 'react';

const ChatSenderCard = ({ message, time }: { message: string; time: string }) => {
  const { palette } = useTheme();

  return (
    <Box width="fit-content" alignSelf="flex-end">
      <Box
        sx={{
          background: 'linear-gradient(87deg, #AB59FF 0%, #858FFF 57.35%, #4D9AFF 100.99%)',
        }}
        padding={{ md: '12px 23px', xs: '12px 15px' }}
        borderRadius="10px 0px 10px 10px"
      >
        <Typography
          variant="body1"
          color={palette?.mode === 'light' ? '#fff' : '#0B081F'}
          fontSize="15px"
          fontWeight="400"
          lineHeight={{ md: '28px', xs: '24px' }}
          margin={0}
        >
          {message}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        color={palette?.mode === 'light' ? '#7C93AE' : '#878D9A'}
        fontSize="10px"
        fontWeight="400"
        lineHeight="28px"
        textAlign="right"
        pr={1}
      >
        {moment(time).format('hh:mm A')}
      </Typography>
    </Box>
  );
};

export default ChatSenderCard;
