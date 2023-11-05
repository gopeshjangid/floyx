import { imgUser } from '@/assets/images';
import UserAvatar from '@/components/UserAvatar';
import styled from '@emotion/styled';
import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Theme,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
type ChatCardProps = {
  active?: boolean;
};
const ListItemItem = styled(ListItem)(({ theme }: { theme: Theme }) => ({
  alignItems: 'center',
  gap: '10px',
  padding: '15px 23px',
  '&:not(:last-child)': { marginBottom: '20px' },
  '& .MuiListItemText-root': {
    margin: '0',
  },
  [theme.breakpoints.up('md')]: {
    gap: '18px',
  },
}));
const ChatCard: FC = ({ active }: ChatCardProps) => {
  return (
    <ListItemItem
      sx={{
        background: active ? '#131B3C' : '',
      }}
    >
      <ListItemAvatar>
        <UserAvatar
          src={imgUser}
          alt="Travis Howard"
          sx={{
            width: { md: '59px', xs: '50px' },
            height: { md: '59px', xs: '50px' },
          }}
        />
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
                fontFamily="Poppins"
                fontSize="16px"
                fontWeight={500}
                component="span"
              >
                Nora{' '}
              </Typography>
              <Typography
                fontFamily="Poppins"
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
              fontFamily="Poppins"
              fontSize={{ md: '16px', xs: '14px' }}
              fontWeight={500}
            >
              2 hours ago
            </Typography>{' '}
          </Box>
        }
        secondary={
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="#85838F"
            fontFamily="Poppins"
            fontSize={{ md: '16px', xs: '14px' }}
            fontWeight={500}
          >
            {` Hey, how's your day....`}
          </Typography>
        }
      />
    </ListItemItem>
  );
};

export default ChatCard;
