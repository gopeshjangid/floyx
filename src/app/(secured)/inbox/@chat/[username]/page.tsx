'use client';

import ChatHeader from '@/app/(secured)/inbox/components/chat-header';
import ChatInput from '@/app/(secured)/inbox/components/chat-input';
import ChatReceiverCard from '@/app/(secured)/inbox/components/chat-receiver-card';
import ChatSenderCard from '@/app/(secured)/inbox/components/chat-sender-card';
import Wrapper from '@/components/wrapper';
import { Box, Typography } from '@mui/material';
import React from 'react';

const Page = () => {
  return (
    <>
      <Wrapper mb={2}>
        <ChatHeader />
        <Box padding={{ md: '13px 25px', xs: '13px 15px' }}>
          <Typography textAlign="center" color="#878D9A" fontSize="13px" fontWeight="400">
            Today
          </Typography>
          <Box
            sx={{
              height: '460px',
              overflowY: 'auto',
              pr: 1,
            }}
            width="100%"
          >
            <Box display="flex" flexDirection="column" justifyContent="flex-end" gap={2}>
              <ChatReceiverCard id="1" message="Hey! just working How about you?" />
              <ChatSenderCard id="1" message="Hi! What have you been up to?" />
              <ChatReceiverCard id="2" message="I've been keeping busy too. Any exciting plans?" />
              <ChatReceiverCard id="1" message="Hey! just working How about you?" />
              <ChatSenderCard id="1" message="Hi! What have you been up to?" />
              <ChatReceiverCard id="2" message="I've been keeping busy too. Any exciting plans?" />
              <ChatReceiverCard id="1" message="Hey! just working How about you?" />
              <ChatSenderCard id="1" message="Hi! What have you been up to?" />
              <ChatReceiverCard id="2" message="I've been keeping busy too. Any exciting plans?" />
            </Box>
          </Box>
        </Box>
      </Wrapper>
      <ChatInput />
    </>
  );
};

export default Page;
