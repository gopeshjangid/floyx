'use client';
import { Box, Grid, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import DateParser from '../DateParser';
import moment from 'moment';
import CalendarIcon from '@/images/image/calendarIcon';
import UserAvatar from '../UserAvatar';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
import UsernameLink, { ProfileName } from '../usernameLink';
import React from 'react';
import { GradientText } from '../GradientComponents';

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

function UserCard({
  name,
  username,
  timestamp,
  shared,
  showDate,
  isArticle = false,
  isPost = false,
}: {
  name: string;
  username: string;
  timestamp?: number;
  shared?: any;
  showDate?: any;
  isArticle?: boolean;
  isPost?: boolean;
}) {
  const getSharedLink = () => (
    <Stack direction="row" gap={1}>
      <Typography variant="subtitle1">
        {` ${shared ? ' shared a ' : ''}`}
      </Typography>
      {shared && (
        <Link href={`/post/${shared.id}`} underline="none">
          <GradientText>post</GradientText>
        </Link>
      )}
    </Stack>
  );

  return (
    <UserCardBox>
      <Box sx={{ marginRight: '10px' }}>
        <UserAvatar
          alt={name}
          src={`${ApiEndpoint.CurrentUserDetails}/avatar/${username}`}
          sx={{ width: '50px', height: '50px' }}
        />
      </Box>
      <Box
        display={'flex'}
        flexDirection={isPost ? 'column' : 'row'}
        justifyContent="space-between"
        width="100%"
      >
        <Stack direction="row" width={'100%'}>
          <Grid container spacing={0} width={'100%'}>
            <Grid item xs={showDate ? 6 : 12} sm={showDate ? 7 : 12}>
              <Stack
                direction={isArticle ? 'column' : 'row'}
                gap={isArticle ? 0 : 0.5}
                flexWrap={'wrap'}
                alignItems={'center'}
              >
                <ProfileName variant="subtitle1">{name} </ProfileName>
                <UsernameLink
                  variant="subtitle2"
                  username={username}
                  onClick={e => e.stopPropagation()}
                />
                {shared && (
                  <Box display={{ xs: 'none', sm: 'block' }}>
                    {getSharedLink()}
                  </Box>
                )}
              </Stack>
              <Stack direction="row" gap={1} alignItems={'flex-start'}>
                {timestamp && (
                  <Box>
                    <DateParser date={timestamp} />
                  </Box>
                )}
                {shared && (
                  <Box display={{ xs: 'block', sm: 'none' }}>
                    {getSharedLink()}
                  </Box>
                )}
              </Stack>
            </Grid>

            {showDate && (
              <Grid item xs={5}>
                <Box display="flex" justifyContent={'center'}>
                  <CalendarIcon />
                  &nbsp;
                  <Typography
                    variant="caption"
                    component={'span'}
                    color="textPrimary"
                    marginBottom={0}
                  >
                    {moment(showDate).format('MMM DD, YY')}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Stack>
      </Box>
    </UserCardBox>
  );
}

export default React.memo(UserCard);
