'use client';

import { iconSearch, imgUser } from '@/assets/images';
import { Box, IconButton, InputAdornment, TextField, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { usePathname } from 'next/navigation';

import ChatCard from './components/chat-item';
import Wrapper from '@/components/wrapper';

const messagesUserData = [
  {
    id: '1',
    img: imgUser,
    username: 'Nora',
    userId: 'Jaco',
    hour: '1 hours ago',
    description: "Good to see you! What's...",
  },
  {
    id: '2',
    img: imgUser,
    username: 'Nora',
    userId: 'Jaco',
    hour: '1 hours ago',
    description: "Good to see you! What's...",
  },
  {
    id: '3',
    img: imgUser,
    username: 'Nora',
    userId: 'Jaco',
    hour: '1 hours ago',
    description: "Good to see you! What's...",
  },
  {
    id: '4',
    img: imgUser,
    username: 'Nora',
    userId: 'Jaco',
    hour: '1 hours ago',
    description: "Good to see you! What's...",
  },
  {
    id: '5',
    img: imgUser,
    username: 'Nora',
    userId: 'Jaco',
    hour: '1 hours ago',
    description: "Good to see you! What's...",
  },
];

const Default = () => {
  const pathname = usePathname();
  const { palette, breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('md'));
  const isChatOpen = pathname?.split('/').length === 3;

  if (isMobile && isChatOpen) {
    return null;
  }

  return (
    <Wrapper>
      <Box borderBottom={`1px solid ${palette?.mode === 'light' ? '#E7F0FC' : 'rgba(255, 255, 255, 0.15)'}`} padding="18px 20px 15px">
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
        {messagesUserData?.map((chats: any) => {
          return <ChatCard key={chats.id} {...chats} />;
        })}
      </Box>
    </Wrapper>
  );
};

export default Default;
