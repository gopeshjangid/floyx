'use client';

import { Box, List, Theme, styled } from '@mui/material';
import React from 'react';

import Wrapper from '@/components/wrapper';
import BlockedUserItem from '@/components/BlockedUserItem';

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

const blockedUsers = [
  {
    id: '5efdbf14fb6be50001cbc36c',
    username: 'saddam_beta',
    name: 'Saddam Husain Khans',
    avatar:
      'https://floyx-beta.s3.us-east-2.amazonaws.com/profile/79c17c3f1c704e829cb0a7d75d203937.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR%2F20231202%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20231202T051346Z&X-Amz-SignedHeaders=host&X-Amz-Signature=e73d1d57372195469a361db5984d644f47588b84b8e54b3357813ac49d01c74b',
  },

  {
    id: '5efdbf14fb6be50001cbc36c',
    username: 'saddam_beta',
    name: 'Saddam Husain Khans',
    avatar:
      'https://floyx-beta.s3.us-east-2.amazonaws.com/profile/79c17c3f1c704e829cb0a7d75d203937.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR%2F20231202%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20231202T051346Z&X-Amz-SignedHeaders=host&X-Amz-Signature=e73d1d57372195469a361db5984d644f47588b84b8e54b3357813ac49d01c74b',
  },

  {
    id: '5efdbf14fb6be50001cbc36c',
    username: 'saddam_beta',
    name: 'Saddam Husain Khans',
    avatar:
      'https://floyx-beta.s3.us-east-2.amazonaws.com/profile/79c17c3f1c704e829cb0a7d75d203937.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR%2F20231202%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20231202T051346Z&X-Amz-SignedHeaders=host&X-Amz-Signature=e73d1d57372195469a361db5984d644f47588b84b8e54b3357813ac49d01c74b',
  },
  {
    id: '5efdbf14fb6be50001cbc36c',
    username: 'saddam_beta',
    name: 'Saddam Husain Khans',
    avatar:
      'https://floyx-beta.s3.us-east-2.amazonaws.com/profile/79c17c3f1c704e829cb0a7d75d203937.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR%2F20231202%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20231202T051346Z&X-Amz-SignedHeaders=host&X-Amz-Signature=e73d1d57372195469a361db5984d644f47588b84b8e54b3357813ac49d01c74b',
  },
  {
    id: '5efdbf14fb6be50001cbc36c',
    username: 'saddam_beta',
    name: 'Saddam Husain Khans',
    avatar:
      'https://floyx-beta.s3.us-east-2.amazonaws.com/profile/79c17c3f1c704e829cb0a7d75d203937.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR%2F20231202%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20231202T051346Z&X-Amz-SignedHeaders=host&X-Amz-Signature=e73d1d57372195469a361db5984d644f47588b84b8e54b3357813ac49d01c74b',
  },
  {
    id: '5efdbf14fb6be50001cbc36c',
    username: 'saddam_beta',
    name: 'Saddam Husain Khans',
    avatar:
      'https://floyx-beta.s3.us-east-2.amazonaws.com/profile/79c17c3f1c704e829cb0a7d75d203937.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR%2F20231202%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20231202T051346Z&X-Amz-SignedHeaders=host&X-Amz-Signature=e73d1d57372195469a361db5984d644f47588b84b8e54b3357813ac49d01c74b',
  },
  {
    id: '5efdbf14fb6be50001cbc36c',
    username: 'saddam_beta',
    name: 'Saddam Husain Khans',
    avatar:
      'https://floyx-beta.s3.us-east-2.amazonaws.com/profile/79c17c3f1c704e829cb0a7d75d203937.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR%2F20231202%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20231202T051346Z&X-Amz-SignedHeaders=host&X-Amz-Signature=e73d1d57372195469a361db5984d644f47588b84b8e54b3357813ac49d01c74b',
  },
  {
    id: '5efdbf14fb6be50001cbc36c',
    username: 'saddam_beta',
    name: 'Saddam Husain Khans',
    avatar:
      'https://floyx-beta.s3.us-east-2.amazonaws.com/profile/79c17c3f1c704e829cb0a7d75d203937.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR%2F20231202%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20231202T051346Z&X-Amz-SignedHeaders=host&X-Amz-Signature=e73d1d57372195469a361db5984d644f47588b84b8e54b3357813ac49d01c74b',
  },
  {
    id: '5efdbf14fb6be50001cbc36c',
    username: 'saddam_beta',
    name: 'Saddam Husain Khans',
    avatar:
      'https://floyx-beta.s3.us-east-2.amazonaws.com/profile/79c17c3f1c704e829cb0a7d75d203937.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR%2F20231202%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20231202T051346Z&X-Amz-SignedHeaders=host&X-Amz-Signature=e73d1d57372195469a361db5984d644f47588b84b8e54b3357813ac49d01c74b',
  },
  {
    id: '5efdbf14fb6be50001cbc36c',
    username: 'saddam_beta',
    name: 'Saddam Husain Khans',
    avatar:
      'https://floyx-beta.s3.us-east-2.amazonaws.com/profile/79c17c3f1c704e829cb0a7d75d203937.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR%2F20231202%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20231202T051346Z&X-Amz-SignedHeaders=host&X-Amz-Signature=e73d1d57372195469a361db5984d644f47588b84b8e54b3357813ac49d01c74b',
  },
  {
    id: '5efdbf14fb6be50001cbc36c',
    username: 'saddam_beta',
    name: 'Saddam Husain Khans',
    avatar:
      'https://floyx-beta.s3.us-east-2.amazonaws.com/profile/79c17c3f1c704e829cb0a7d75d203937.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR%2F20231202%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20231202T051346Z&X-Amz-SignedHeaders=host&X-Amz-Signature=e73d1d57372195469a361db5984d644f47588b84b8e54b3357813ac49d01c74b',
  },
  {
    id: '5efdbf14fb6be50001cbc36c',
    username: 'saddam_beta',
    name: 'Saddam Husain Khans',
    avatar:
      'https://floyx-beta.s3.us-east-2.amazonaws.com/profile/79c17c3f1c704e829cb0a7d75d203937.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR%2F20231202%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20231202T051346Z&X-Amz-SignedHeaders=host&X-Amz-Signature=e73d1d57372195469a361db5984d644f47588b84b8e54b3357813ac49d01c74b',
  },
  {
    id: '5efdbf14fb6be50001cbc36c',
    username: 'saddam_beta',
    name: 'Saddam Husain Khans',
    avatar:
      'https://floyx-beta.s3.us-east-2.amazonaws.com/profile/79c17c3f1c704e829cb0a7d75d203937.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR%2F20231202%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20231202T051346Z&X-Amz-SignedHeaders=host&X-Amz-Signature=e73d1d57372195469a361db5984d644f47588b84b8e54b3357813ac49d01c74b',
  },
];

const BlockedUsers = () => {
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
        {blockedUsers.length > 0 ? (
          <List sx={{ width: '100%', p: 0 }} component="ul">
            {blockedUsers?.map((item: IBlockedUserItem, index: number) => (
              <BlockedUserItem key={index} {...item} />
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
