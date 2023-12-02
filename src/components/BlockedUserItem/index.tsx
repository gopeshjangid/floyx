import React from 'react';
import {
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import Link from 'next/link';

import UserAvatar from '../UserAvatar';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';

const ListItemItem = styled(ListItem)(({ theme }) => ({
  alignItems: 'center',
  gap: '10px',
  padding: '9px 21px',
  '& .MuiListItemText-root': {
    margin: '0',
    cursor: 'pointer',
  },
  borderBottom: `1px solid ${
    theme.palette?.mode === 'light' ? '#E7F0FC' : 'rgba(255, 255, 255, 0.15)'
  }`,
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
    padding: '13px 31px 13px 0px',

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

interface IBlockedUserItem {
  id: string;
  username: string;
  name: string;
  avatar: string;
}

const BlockedUserItem = ({ id, username, name, avatar }: IBlockedUserItem) => {
  const { palette } = useTheme();
  const isBlocked = true;

  return (
    <ListItemItem>
      <ListItemAvatar>
        <Link href={`/profile/${username}/posts`}>
          <UserAvatar
            src={`${ApiEndpoint.ProfileDetails}/avatar/${username}`}
            alt={name}
            sx={{
              width: { md: '59px', xs: '50px' },
              height: { md: '59px', xs: '50px' },
            }}
          />
        </Link>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            color={palette?.mode === 'light' ? '#2F2E41' : '#fff'}
            fontSize="16px"
            fontWeight={400}
          >
            {name}
          </Typography>
        }
        secondary={
          <Typography
            sx={{
              display: 'inline',
              background:
                'linear-gradient(92deg, #A561FF 1.76%, #9881FE 33.15%, #5798FF 98.75%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            component="span"
            variant="body2"
            color={palette.primary[300]}
            fontSize="14px"
            fontWeight={500}
          >
            @{username}
          </Typography>
        }
      />

      <Button
        sx={{
          borderRadius: '20px',
          padding: '5px 15px',
          background: '#5798FF3B',
        }}
      >
        {isBlocked ? 'Unblock' : 'Block'}
      </Button>
    </ListItemItem>
  );
};

export default BlockedUserItem;
