import React from 'react';
import Image from 'next/image';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Theme,
  styled,
} from '@mui/material';

import { iconPaperPlane, iconSmile, imgUser } from '@/assets/images';
import UserAvatar from '@/components/UserAvatar';

const ChatInputWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  borderRadius: '10px',
  background: theme.palette?.mode === 'light' ? '#fff' : '#0B081F',
  border: `1px solid ${
    theme.palette?.mode === 'light' ? '#E7F0FC' : 'rgba(255, 255, 255, 0.15)'
  }`,
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
    <ChatInputWrapper>
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
          sx={{ width: '49px', height: '49px' }}
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
