import { iconUserGradient, imgUser } from '@/assets/images';
import styled from '@emotion/styled';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Theme,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React, { FC } from 'react';
import UserAvatar from './UserAvatar';

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
      '& img': {
        width: '18px',
        height: '18px',
      },
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
        '& img': {
          width: '19px',
          height: '19px',
        },
      },
    },
  },
}));
const NotificationCard: FC = () => {
  return (
    <ListItemItem>
      <ListItemAvatar>
        <UserAvatar
          src={imgUser}
          alt="Travis Howard"
          sx={{
            width: { md: '59px', xs: '50px' },
            height: { md: '59px', xs: '50px' },
          }}
        />
        <span>
          <Image src={iconUserGradient} alt="icon" />
          {/*
          // TODO: All User Icon 🔝
          iconUserGradient,
        iconLinkGradient,
        iconLinkMessage,
        iconTelegramGradient
        */}
        </span>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            color="#fff"
            fontFamily="Poppins"
            fontSize="16px"
            fontWeight={400}
          >
            Nora Jacob commented on the post you shared{' '}
          </Typography>
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
            2 hours ago
          </Typography>
        }
      />
    </ListItemItem>
  );
};

export default NotificationCard;
