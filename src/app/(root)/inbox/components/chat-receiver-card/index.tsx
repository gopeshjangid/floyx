import { Box, Typography } from '@mui/material';
import React from 'react';

type ChatReceiverCardProps = {
  id: string;
  message: string;
};
const ChatReceiverCard = ({ id, message }: ChatReceiverCardProps) => {
  return (
    <Box width="fit-content">
      <Box
        className={`chat-card ${id}`}
        bgcolor="#5798FF"
        padding={{ md: '12px 23px', xs: '12px 15px' }}
        borderRadius="0px 10px 10px 10px"
      >
        <Typography
          variant="body1"
          color="#0B081F"
          fontSize="15px"
          fontWeight="400"
          lineHeight={{ md: '28px', xs: '24px' }}
        >
          {message}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        color="#878D9A"
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
