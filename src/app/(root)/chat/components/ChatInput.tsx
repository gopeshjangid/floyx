import React from 'react';
import Image from 'next/image';
import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from '@mui/material';

import { iconPaperPlane, iconSmile, imgUser } from '@/assets/images';
import UserAvatar from '@/components/UserAvatar';

const ChatInput = () => {
  return (
    <Paper
      sx={{
        borderRadius: '10px',
        border: ' 1px solid  rgba(255, 255, 255, 0.15)',
        background: '#0B081F',
        padding: '27px 25px ',
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
          sx={{ width: '49px', height: '49px' }}
        />
        <Box
          flex={1}
          sx={{
            '& .MuiFormControl-root': {
              marginBottom: '0',
              borderRadius: '5px',
              overflow: 'hidden',
              '& input': {
                padding: '16px 25px',
              },
            },
          }}
        >
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
        <IconButton
          sx={{
            borderRadius: '5px',
            background:
              'linear-gradient(92deg, #A561FF 1.76%, #9881FE 33.15%, #5798FF 98.75%)',
            width: '55px',
            height: '55px',
          }}
        >
          <Image src={iconPaperPlane} alt="paper plane icon" />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatInput;
