import React from 'react';
import { Box, ListItem, ListItemAvatar, ListItemText, Theme, Typography, styled, useTheme } from '@mui/material';
import { useParams } from 'next/navigation';

import UserAvatar from '@/components/UserAvatar';
import { allRoutes } from '@/constants/allRoutes';
import { IThread } from '../../types';
import { getRelativeTime } from '@/lib/utils';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';
import Link from 'next/link';

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

const ChatCard = (thread: IThread) => {
  const { palette } = useTheme();
  const params = useParams();

  return (
    <ListItemItem
      sx={{
        background: params?.username === thread.user.username ? '#131B3C' : '',
      }}
    >
      <Link href={`${allRoutes.inbox}/${thread.user.username}`}>
        <ListItemAvatar>
          <UserAvatar
            src={`${ApiEndpoint.ProfileDetails}/avatar/${thread.user.username}`}
            alt={thread.user?.name}
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
                  {thread.user?.name.split(' ')[0]}
                </Typography>
                <Typography fontSize="14px" fontWeight={400} component="span" className="gradient-text">
                  @{thread.user?.username}
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
                {getRelativeTime(thread.lastMessageDate)}
              </Typography>{' '}
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
