'use client';

import { iconSearch, imgUser } from '@/assets/images';
import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import ChatCard from './components/chat-item';

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

const Defalut = () => {
  return (
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
          return <ChatCard key={chats.id} {...chats} />;
        })}
      </Box>
    </Paper>
  );
};

export default Defalut;
