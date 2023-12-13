'use client';
import { Box, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import DateParser from '../DateParser';
import moment from 'moment';
import CalendarIcon from '@/images/image/calendarIcon';
import UserAvatar from '../UserAvatar';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
import UsernameLink from '../usernameLink';

export const UserCardBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  padding: '20px 0px',
  '& .display-flex': {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function UserCard({
  name,
  username,
  timestamp,
  shared,
  showDate,
  comment,
}: {
  name: string;
  username: string;
  timestamp?: number;
  shared?: any;
  showDate?: any;
  comment?: string;
}) {
  return (
    <UserCardBox>
      <Box sx={{ marginRight: '10px' }}>
        <UserAvatar
          alt={name}
          src={`${ApiEndpoint.CurrentUserDetails}/avatar/${username}`}
          sx={{ width: '50px', height: '50px' }}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" width="100%">
        <Box display="flex" flexDirection="column" width="100%">
          <Typography
            variant="subtitle1"
            component={'span'}
            color="textPrimary"
          >
            {name}{' '}
          </Typography>
          <UsernameLink variant="subtitle2" username={username} />
          {` ${shared ? ' shared a ' : ''}`}
          {shared && (
            <Link href="#" underline="none">
              post
            </Link>
          )}
        </Box>
        {timestamp && (
          <Box>
            <DateParser date={timestamp} />
          </Box>
        )}
        {showDate && (
          <Box width="40%" sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarIcon />
            &nbsp;
            {moment(showDate).format('MMM DD, YY')}
          </Box>
        )}
        {comment && (
          <Box>
            <Typography>{comment}</Typography>
          </Box>
        )}
      </Box>
    </UserCardBox>
  );
}
