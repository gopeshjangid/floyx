'use client';

import React from 'react';
import Image from 'next/image';
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import ChatItem from './components/ChatItem';
import { iconSearch, imgUser } from '@/assets/images';
import ChatInput from './components/ChatInput';
import ChatHeader from './components/ChatHeader';
import ChatSenderCard from './components/ChatSenderCard';
import ChatReceiverCard from './components/ChatReceiverCard';

const Messages = () => {
  const messagesUserData = [
    {
      id: '1',
      img: imgUser,
      username: 'Nora',
      userId: 'Jaco',
      date: '1 hours ago',
      description: "Good to see you! What's...",
    },
    {
      id: '2',
      img: imgUser,
      username: 'Nora',
      userId: 'Jaco',
      date: '1 hours ago',
      description: "Good to see you! What's...",
    },
    {
      id: '3',
      img: imgUser,
      username: 'Nora',
      userId: 'Jaco',
      date: '1 hours ago',
      description: "Good to see you! What's...",
    },
    {
      id: '4',
      img: imgUser,
      username: 'Nora',
      userId: 'Jaco',
      date: '1 hours ago',
      description: "Good to see you! What's...",
    },
    {
      id: '5',
      img: imgUser,
      username: 'Nora',
      userId: 'Jaco',
      date: '1 hours ago',
      description: "Good to see you! What's...",
    },
  ];
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xl={3} lg={4} md={5} xs={12}>
          <Paper
            sx={{
              borderRadius: '10px',
              border: ' 1px solid  rgba(255, 255, 255, 0.15)',
              background: '#0B081F',
            }}
          >
            <Box
              borderBottom="1px solid rgba(255, 255, 255, 0.15)"
              padding="18px 20px 15px"
            >
              <TextField
                fullWidth
                hiddenLabel
                placeholder="Search people..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" color="primary">
                        <Image src={iconSearch} alt="" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ height: '620px', overflowY: 'auto', pr: 1 }}>
              {messagesUserData?.map((chats: ChatItemType) => {
                return <ChatItem key={chats.id} {...chats} />;
              })}
            </Box>
          </Paper>
        </Grid>
        <Grid item xl={9} lg={8} md={7} xs={12}>
          <Paper
            sx={{
              borderRadius: '10px',
              border: ' 1px solid  rgba(255, 255, 255, 0.15)',
              background: '#0B081F',
              marginBottom: 2,
            }}
          >
            <ChatHeader />
            <Box padding={{ md: '13px 25px', xs: '13px 15px' }}>
              <Typography
                textAlign="center"
                color="#878D9A"
                fontSize="13px"
                fontWeight="400"
              >
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
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  gap={2}
                >
                  <ChatReceiverCard
                    id="1"
                    message="Hey! just working How about you?"
                  />
                  <ChatSenderCard
                    id="1"
                    message="Hi! What have you been up to?"
                  />
                  <ChatReceiverCard
                    id="2"
                    message="I've been keeping busy too. Any exciting plans?"
                  />
                  <ChatReceiverCard
                    id="1"
                    message="Hey! just working How about you?"
                  />
                  <ChatSenderCard
                    id="1"
                    message="Hi! What have you been up to?"
                  />
                  <ChatReceiverCard
                    id="2"
                    message="I've been keeping busy too. Any exciting plans?"
                  />
                  <ChatReceiverCard
                    id="1"
                    message="Hey! just working How about you?"
                  />
                  <ChatSenderCard
                    id="1"
                    message="Hi! What have you been up to?"
                  />
                  <ChatReceiverCard
                    id="2"
                    message="I've been keeping busy too. Any exciting plans?"
                  />
                </Box>
              </Box>
            </Box>
          </Paper>
          <ChatInput />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Messages;
