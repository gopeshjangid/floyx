'use client';

import { Box, List, Theme, styled } from '@mui/material';
import React, { useEffect } from 'react';

import Wrapper from '@/components/wrapper';
import BlockedUserItem from '@/components/BlockedUserItem';
import {
  useGetBlockedUsersQuery,
  useUnblockUserMutation,
} from '@/lib/redux/slices/accountSetting';
import BlockedUserLoader from './loading';
import { useToast } from '@/components/Toast/useToast';
import { showErrorMessages } from '@/lib/utils';

const AccountWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  '& .MuiInputBase-root': {
    background: theme.palette.background.default,
  },
  margin: '25px',
  [theme.breakpoints.up('md')]: {
    margin: '50px',
  },
}));

interface IBlockedUserItem {
  id: string;
  username: string;
  name: string;
  avatar: string;
}

const BlockedUsers = () => {
  const toast = useToast();
  const { data: blockedUsers, isLoading, error } = useGetBlockedUsersQuery({});
  const [
    unBlockUser,
    { data: unBlockUserData, isLoading: isUnBlockUserLoading },
  ] = useUnblockUserMutation();

  useEffect(() => {
    if ((error as any)?.length > 0) {
      toast.error(showErrorMessages(error as any));
    }
  }, [error]);

  useEffect(() => {
    if (unBlockUserData === 'success') {
      toast.success('User unblocked successfully');
    } else if (unBlockUserData === 'eror') {
      toast.error('Something went wrong');
    }
  }, [unBlockUserData]);

  if (isLoading) {
    return <BlockedUserLoader />;
  }

  return (
    <Wrapper
      sx={{
        maxWidth: {
          xs: '100%',
          sm: '70%',
        },
        marginTop: '20px',
      }}
    >
      <AccountWrapper>
        {blockedUsers?.length > 0 ? (
          <List sx={{ width: '100%', p: 0 }} component="ul">
            {blockedUsers?.map((item: IBlockedUserItem, index: number) => (
              <BlockedUserItem
                key={index}
                {...item}
                unBlockUser={unBlockUser}
                loading={isUnBlockUserLoading}
              />
            ))}
          </List>
        ) : (
          <Box mb={5} textAlign="center">
            No Blocked Users
          </Box>
        )}
      </AccountWrapper>
    </Wrapper>
  );
};

export default BlockedUsers;
