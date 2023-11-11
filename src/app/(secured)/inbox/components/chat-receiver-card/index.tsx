import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import React from 'react';

type ChatReceiverCardProps = {
  message: string;
};
const ChatReceiverCard = ({ message }: ChatReceiverCardProps) => {
  const { palette } = useTheme();
  return (
    <Box width="fit-content">
      <Box bgcolor="#5798FF" padding={{ md: '12px 23px', xs: '12px 15px' }} borderRadius="0px 10px 10px 10px">
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
        12:30 PM
      </Typography>
    </Box>
  );
};

export default ChatReceiverCard;
