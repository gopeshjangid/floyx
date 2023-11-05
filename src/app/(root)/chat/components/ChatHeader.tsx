import { imgUser } from '@/assets/images';
import styled from '@emotion/styled';
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Theme,
  Typography,
} from '@mui/material';
import React from 'react';
const ChatWrapper = styled(ListItem)(({ theme }: { theme: Theme }) => ({
  alignItems: 'center',
  gap: '10px',
  padding: '12px 26px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
  '&:not(:last-child)': { marginBottom: '20px' },
  '& .MuiListItemText-root': {
    margin: '0',
  },
  '& .MuiListItemAvatar-root': {
    position: 'relative',
    '& .MuiAvatar-root': {
      border: '1px solid  #A561FF',
      width: '50px',
      height: '50px',
      background: 'rgba(194, 148, 255, 0.38)',
    },
  },
  [theme.breakpoints.up('md')]: {
    gap: '18px',

    '& .MuiListItemAvatar-root': {
      '& .MuiAvatar-root': {
        width: '59px',
        height: '59px',
      },
      '& span': {
        right: '-7px',
        bottom: '0',
        width: '27px',
        height: '27px',
        '& img': {
          width: '19px',
          height: '19px',
        },
      },
    },
  },
}));
const ChatHeader = () => {
  return (
    <ChatWrapper>
      <ListItemAvatar>
        <Avatar alt="Travis Howard" src={imgUser} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Box>
              <Typography
                color="#fff"
                font-family="Poppins"
                fontSize="16px"
                fontWeight={500}
                component="span"
              >
                Nora
              </Typography>
              <Typography
                font-family="Poppins"
                fontSize="14px"
                fontWeight={400}
                component="span"
                className="gradient-text"
              >
                @Jaco
              </Typography>
            </Box>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="#85838F"
              font-family="Poppins"
              fontSize={{ md: '16px', xs: '14px' }}
              fontWeight={500}
            >
              Delete
            </Typography>
          </Box>
        }
        secondary={
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="#85838F"
            font-family="Poppins"
            fontSize={{ md: '16px', xs: '14px' }}
            fontWeight={500}
          >
            Hey, how s your day....
          </Typography>
        }
      />
    </ChatWrapper>
  );
};

export default ChatHeader;
