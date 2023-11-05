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
} from '@mui/material';

import ChatItem from './components/ChatItem';
import { iconSearch } from '@/assets/images';
import ChatInput from './components/ChatInput';
import ChatHeader from './components/ChatHeader';

const Chat = () => {
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

            <Box>
              <ChatItem />
              <ChatItem active />
              <ChatItem />
              <ChatItem />
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
            paper
          </Paper>
          <ChatInput />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
