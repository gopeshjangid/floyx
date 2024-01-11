import UserAvatar from '@/components/UserAvatar';
import { allRoutes } from '@/constants/allRoutes';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';
import { Box, ListItemAvatar, Typography, useTheme } from '@mui/material';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';

const ChatReceiverCard = ({
  message,
  time,
  username,
}: {
  message: string;
  time: string;
  username: string;
}) => {
  const { palette } = useTheme();

  return (
    <Box width="fit-content">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
        }}
      >
        <Box>
          <Link href={`${allRoutes.profile}/${username}`}>
            <ListItemAvatar>
              <UserAvatar
                alt=""
                src={`${ApiEndpoint.ProfileDetails}/avatar/${username}`}
                sx={{
                  width: { md: '59px', xs: '50px' },
                  height: { md: '59px', xs: '50px' },
                }}
              />
            </ListItemAvatar>
          </Link>
        </Box>

        <Box
          bgcolor="#5798FF"
          padding={{ md: '12px 23px', xs: '12px 15px' }}
          borderRadius="0px 10px 10px 10px"
        >
          <Typography
            variant="body1"
            color={palette?.mode === 'light' ? '#fff' : '#0B081F'}
            fontSize="15px"
            fontWeight="400"
            lineHeight={{ md: '28px', xs: '24px' }}
            margin={0}
          >
            {message}
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="body2"
        color={palette?.mode === 'light' ? '#7C93AE' : '#878D9A'}
        fontSize="10px"
        fontWeight="400"
        lineHeight="28px"
        textAlign="right"
        pr={1}
      >
        {moment(time).format('hh:mm A')}
      </Typography>
    </Box>
  );
};

export default ChatReceiverCard;
