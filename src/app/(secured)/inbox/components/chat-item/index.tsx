import React from 'react';
import { Box, ListItem, ListItemAvatar, ListItemText, Theme, Typography, styled, useTheme } from '@mui/material';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import UserAvatar from '@/components/UserAvatar';
import { allRoutes } from '@/constants/allRoutes';
import { getRelativeTime } from '@/lib/utils';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';

const ListItemItem = styled(ListItem)(({ theme }: { theme: Theme }) => ({
  padding: '0',
  '& a': {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px 23px',
    width: '100%',
  },
  '& .MuiListItemText-root': {
    margin: '0',
  },
  [theme.breakpoints.up('md')]: {
    '& a': {
      gap: '18px',
    },
  },
}));

interface IChatCard {
  username: string;
  name: string;
  lastMessageDate?: string;
}

const ChatCard = ({ username, name, lastMessageDate }: IChatCard) => {
  const { palette } = useTheme();
  const params = useParams();

  return (
    <ListItemItem
      sx={{
        background: params?.username === username ? '#131B3C' : '',
      }}
    >
      <Link href={`${allRoutes.inbox}/${username}`}>
        <ListItemAvatar>
          <UserAvatar
            src={`${ApiEndpoint.ProfileDetails}/avatar/${username}`}
            alt={name}
            sx={{
              width: { md: '59px', xs: '50px' },
              height: { md: '59px', xs: '50px' },
            }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
              <Box>
                <Typography color={palette?.mode === 'light' ? '#2F2E41' : '#fff'} fontSize="16px" fontWeight={500} component="span">
                  {name.split(' ')[0]}
                </Typography>
                <Typography fontSize="14px" fontWeight={400} component="span" className="gradient-text">
                  @{username}
                </Typography>
              </Box>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color={palette?.mode === 'light' ? '#85838F' : '#777D88'}
                fontSize="14px"
                fontWeight={500}
              >
                {lastMessageDate ? getRelativeTime(lastMessageDate) : 'Start to talk!'}
              </Typography>
            </Box>
          }
          secondary={
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color={palette?.mode === 'light' ? '#85838F' : '#777D88'}
              fontSize={{ md: '16px', xs: '14px' }}
              fontWeight={500}
            >
              {/* {thread.lastMessageDate} */}
              {/* TODO: no data for last message text */}
            </Typography>
          }
        />
      </Link>
    </ListItemItem>
  );
};

export default ChatCard;
