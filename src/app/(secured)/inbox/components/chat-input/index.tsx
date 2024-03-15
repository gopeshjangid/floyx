import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Theme,
  styled,
} from '@mui/material';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useSession } from 'next-auth/react';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';

import { iconPaperPlane, iconSmile } from '@/assets/images';
import UserAvatar from '@/components/UserAvatar';

const ChatInputWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  width: '100%',
  maxWidth: '96%',
  borderRadius: '10px',
  background:
    theme.palette?.mode === 'light'
      ? theme.palette.primary[900]
      : theme.palette.primary[200],
  border: `1px solid ${theme.palette.primary[800]}`,
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
  [theme.breakpoints.down('lg')]: {
    maxWidth: '90%',
  },
}));

const ChatInput = ({
  onSubmit,
  disabled,
  onMessageChange,
}: {
  onSubmit: (message: string) => void;
  disabled: boolean;
  onMessageChange: (message: string) => void;
}) => {
  const [message, setMessage] = useState('');
  const [emojiPicker, setEmojiPicker] = useState(false);
  const emojiWrapperRef = useRef<HTMLDivElement>(null);
  const session = useSession();

  useEffect(() => {
    document.addEventListener('mousedown', handleEmojiPicker, false);
    return () => {
      document.removeEventListener('mousedown', handleEmojiPicker, false);
    };
  }, []);

  const handleEmojiPicker = (e: any) => {
    if (
      emojiWrapperRef.current &&
      !emojiWrapperRef.current.contains(e.target)
    ) {
      setEmojiPicker(false);
    }
  };

  const handleSubmit = (message: string) => {
    if (message.trim() !== '') {
      onSubmit(message);
      setMessage(''); // Clear the message input

      // Append a newline if Shift key is pressed along with Enter
      if (message.includes('\n')) {
        onMessageChange('\n');
        // setMessage('\n')
      } else {
        onMessageChange(''); // If Enter is pressed without Shift, reset message input
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    onMessageChange(e.target.value);
  };

  const handleChangeEmojiPicker = () => {
    setEmojiPicker(prev => !prev);
  };

  const onEmojiSelect = (emoji: any) => {
    setEmojiPicker(false);
    setMessage(prev => prev + emoji.native);
    onMessageChange(message + emoji.native);
  };

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
          src={`${ApiEndpoint.ProfileDetails}/avatar/${(session as any)?.data?.user?.username
            }`}
          alt={(session as any)?.data?.user?.username}
          sx={{ width: '49px', height: '49px' }}
        />
        <Box flex={1} className="form-control">
          <TextField
            value={message}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleSubmit(message);
              }
            }}
            fullWidth
            hiddenLabel
            multiline  // Enable multiline input
            // rows={2}   // Set the number of rows (adjust as needed)
            placeholder={'Write a message...'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    color="primary"
                    onClick={handleChangeEmojiPicker}
                  >
                    <Image src={iconSmile} alt="smiley" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

        </Box>
        {emojiPicker && (
          <Box
            ref={emojiWrapperRef}
            sx={{
              position: 'absolute',
              bottom: '5px',
              right: '20px',
              zIndex: 1,
            }}
          >
            <Picker data={data} onEmojiSelect={onEmojiSelect} />
          </Box>
        )}
        <IconButton
          className="chat-send-icon"
          onClick={() => handleSubmit(message)}
          disabled={disabled || !message}
        >
          <Image src={iconPaperPlane} alt="paper plane icon" />
        </IconButton>
      </Box>
    </ChatInputWrapper>
  );
};

export default ChatInput;
