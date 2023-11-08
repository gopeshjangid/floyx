import React from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Theme,
  Typography,
} from '@mui/material';
import UserAvatar from '../UserAvatar';

const ListItemItem = styled(ListItem)(({ theme }: { theme: Theme }) => ({
  alignItems: 'center',
  gap: '10px',
  padding: '0',
  '&:not(:last-child)': { marginBottom: '20px' },
  '& .MuiListItemText-root': {
    margin: '0',
  },
  '& .MuiListItemAvatar-root': {
    position: 'relative',
    '& span': {
      position: 'absolute',
      right: '0',
      bottom: '-3px',
      borderRadius: '100%',
      width: '25px',
      height: '25px',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  [theme.breakpoints.up('md')]: {
    gap: '18px',

    '&:not(:last-child)': { marginBottom: '28px' },
    '& .MuiListItemAvatar-root': {
      '& span': {
        right: '-7px',
        bottom: '0',
        width: '27px',
        height: '27px',
      },
    },
  },
}));
const NotificationCard = ({ title, hour, img, icon }: NotificationCardType) => {
  const { palette } = useTheme();
  return (
    <ListItemItem>
      <ListItemAvatar>
        <UserAvatar
          src={img}
          alt="Travis Howard"
          sx={{
            width: { md: '59px', xs: '50px' },
            height: { md: '59px', xs: '50px' },
          }}
        />
        <span>
          <Image src={icon} alt="icon" />
        </span>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            color={palette?.mode === 'light' ? '#2F2E41' : '#fff'}
            fontSize="16px"
            fontWeight={400}
          >
            {title}{' '}
          </Typography>
        }
        secondary={
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color={palette?.mode === 'light' ? '#85838F' : '#777D88'}
            fontSize="14px"
            fontWeight={500}
          >
            {hour}
          </Typography>
        }
      />
    </ListItemItem>
  );
};

export default NotificationCard;
