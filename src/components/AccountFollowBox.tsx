'use client';
import {
  Box,
  Typography,
  useTheme,
  Avatar,
  Stack,
  Skeleton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import UsernameLink, { ProfileName } from './usernameLink';
import {
  useFollowUserMutation,
  useGetPopularAccountsToFollowQuery,
} from '@/lib/redux/slices/profile';
import ButtonWithLoading from './ButtonWithLoading';
import { useState } from 'react';
import Link from 'next/link';

const AccountBox = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.boxBorder}`,
  borderRadius: '10px',
  width: '25%',
  minWidth: '250px',
  background: theme.palette.primary.mainBackground,
}));

export default function FollowNewAccounts() {
  const theme = useTheme();
  const [item, setItem] = useState('');
  const [
    followUser,
    { isLoading: isFollowing, isSuccess, isError: followError },
  ] = useFollowUserMutation();
  const { data, isLoading, isError } = useGetPopularAccountsToFollowQuery({
    param: '?forHome=true',
  });

  const followAccount = account => {
    setItem(account.username);
    followUser({ username: account.username });
  };

  if (isLoading || isError) return null;

  const accountsList = data
    ? data?.result?.filter(account => !account.following)
    : [];
  if (accountsList.length === 0) {
    return null;
  }
  return (
    <Box mt={2}>
      <Typography variant="h6">Follow Accounts</Typography>
      <Stack direction="row" gap={1} my={2} sx={{ overflowX: 'auto' }}>
        {!isLoading && data ? (
          accountsList.map((account, index) => (
            <AccountBox
              p={2}
              justifyContent="center"
              alignItems={'center'}
              gap={2}
              key={`follow-account-${index}`}
            >
              <Link href={`/profile/${account.username}`}>
                <Avatar src={account.avatar} />
              </Link>
              <Stack alignItems={'center'}>
                {account.name && (
                  <Link href={`/profile/${account.username}`}>
                    <ProfileName textAlign="center" variant="body1">
                      {account.name}
                    </ProfileName>
                  </Link>
                )}
                <UsernameLink username={account.username ?? 'suername'} />
              </Stack>
              <Link href={`/profile/${account.username}`}>
                <Stack direction="row" gap={1} alignItems="flex-start">
                  <Typography variant="caption">
                    Followers{'  '}
                    <span style={{ color: theme.palette.primary.main }}>
                      {account.numberOfFollowers}
                    </span>
                  </Typography>
                  <Typography variant="caption">
                    Following{'  '}
                    <span style={{ color: theme.palette.primary.main }}>
                      {' '}
                      {account.numberOfFollowing}
                    </span>
                  </Typography>
                </Stack>
              </Link>
              <ButtonWithLoading
                onClick={() => followAccount({ username: account.username })}
                variant="outlined"
                isLoading={isFollowing && item === account.username}
                isSuccess={isSuccess && item === account.username}
                isError={followError && item === account.username}
                buttonType="ROUND"
                sx={{ borderRadius: '4px' }}
              >
                {isSuccess && item === account.username ? 'Followed' : 'Follow'}
              </ButtonWithLoading>
            </AccountBox>
          ))
        ) : (
          <Skeleton variant="rectangular" width="100%" height="150px" />
        )}
      </Stack>
    </Box>
  );
}
