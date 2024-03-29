'use client';
import {
  Box,
  Typography,
  useTheme,
  Avatar,
  Stack,
  Skeleton,
} from '@mui/material';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import UsernameLink, { ProfileName } from './usernameLink';
import {
  useFollowUserMutation,
  useGetPopularAccountsToFollowQuery,
} from '@/lib/redux/slices/profile';
import ButtonWithLoading from './ButtonWithLoading';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const AccountBox = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.boxBorder}`,
  borderRadius: '10px',
  width: '25%',
  minWidth: '250px',
  background: theme.palette.primary.mainBackground,
}));

export default function FollowNewAccounts() {
  const { t } = useTranslation();
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

  const handleAccountListScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('accountsListContainer');
    if (container) {
      const scrollAmount = 200;
      container.scrollLeft +=
        direction === 'right' ? scrollAmount : -scrollAmount;
    }
  };

  if (isLoading || isError) return null;

  const accountsList = data
    ? data?.result?.filter(account => !account.following)
    : [];
  if (accountsList.length === 0) {
    return null;
  }
  return (
    <Box translate="no" mt={2} display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" sx={{ marginRight: '8px' }}>
          {t('Home.followSection.title')}
        </Typography>
        <Box display="flex" alignItems="center">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={1}
            onClick={() => handleAccountListScroll('left')}
            sx={{ cursor: 'pointer' }}
          >
            <ChevronLeft />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={1}
            onClick={() => handleAccountListScroll('right')}
            sx={{ cursor: 'pointer' }}
          >
            <ChevronRight />
          </Box>
        </Box>
      </Box>
      <Stack
        direction="row"
        gap={1}
        my={2}
        sx={{ overflowX: 'hidden' }}
        id="accountsListContainer"
      >
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
                  <Typography translate="no" variant="caption">
                    {t('Home.followSection.followers')}{' '}
                    <span style={{ color: theme.palette.primary.main }}>
                      {account.numberOfFollowers}
                    </span>
                  </Typography>
                  <Typography translate="no" variant="caption">
                    {t('Home.followSection.following')}
                    <span style={{ color: theme.palette.primary.main }}>
                      {' '}
                      {account.numberOfFollowing}
                    </span>
                  </Typography>
                </Stack>
              </Link>
              <ButtonWithLoading
                translate="no"
                onClick={() => followAccount({ username: account.username })}
                variant="outlined"
                isLoading={isFollowing && item === account.username}
                isSuccess={isSuccess && item === account.username}
                isError={followError && item === account.username}
                buttonType="ROUND"
                sx={{ borderRadius: '4px' }}
              >
                {isSuccess && item === account.username
                  ? t('Home.followSection.followed')
                  : t('Home.followSection.follow')}
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
