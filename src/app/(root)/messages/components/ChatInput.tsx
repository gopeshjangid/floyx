import React from 'react';
import Image from 'next/image';
import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Theme,
} from '@mui/material';

import { iconPaperPlane, iconSmile, imgUser } from '@/assets/images';
import UserAvatar from '@/components/UserAvatar';
import styled from '@emotion/styled';
const ChatInputWrapper = styled(Paper)(({ theme }: { theme: Theme }) => ({
  borderRadius: '10px',
  border: ' 1px solid  rgba(255, 255, 255, 0.15)',
  background: '#0B081F',
  padding: '30px 14px 29px',
  '& .form-control': {
    '& .MuiFormControl-root': {
      marginBottom: '0',
      borderRadius: '5px',
      overflow: 'hidden',
      '& .MuiInputBase-adornedEnd': { paddingRight: '13px !important' },
      '& input': {
        padding: '16px 13px',
      },
    },
  },
  '& .chat-send-icon': {
    borderRadius: '5px',
    background:
      'linear-gradient(92deg, #A561FF 1.76%, #9881FE 33.15%, #5798FF 98.75%)',
    width: '45px',
    height: '45px',
  },
  [theme.breakpoints.up('md')]: {
    padding: '27px 25px',
    '& .MuiFormControl-root': {
      '& .MuiInputBase-adornedEnd': { paddingRight: '20px !important' },

      '& input': {
        padding: '16px 25px',
      },
    },
    '& .chat-send-icon': {
      width: '55px',
      height: '55px',
    },
  },
}));
const ChatInput = () => {
  return (
    <ChatInputWrapper
      sx={{
        borderRadius: '10px',
        border: ' 1px solid  rgba(255, 255, 255, 0.15)',
        background: '#0B081F',
        padding: { md: '27px 25px', xs: '30px 14px 29px' },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={1.5}
      >
        <UserAvatar
          src={imgUser}
          alt="user"
          sx={{ width: '49px', height: '45px' }}
        />
        <Box flex={1} className="form-control">
          <TextField
            fullWidth
            hiddenLabel
            placeholder="Message to Michele..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" color="primary">
                    <Image src={iconSmile} alt="" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <IconButton className="chat-send-icon">
          <Image src={iconPaperPlane} alt="paper plane icon" />
        </IconButton>
      </Box>
    </ChatInputWrapper>
  );
};

export default ChatInput;
