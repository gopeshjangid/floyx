import {
  Avatar,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useGetProfileDetailsQuery } from '@/lib/redux/slices/profile';
import UsernameLink, { ProfileName } from './usernameLink';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const SidebarProfileBar: React.FC = () => {
  const { palette } = useTheme();
  const session = useSession();
  const username = (session as any)?.data?.user?.username ?? '';
  const { data, isFetching, isLoading, error } = useGetProfileDetailsQuery(
    {
      username: username!,
    },
    { skip: !username }
  );

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: palette.primary.mainBackground,
        padding: 1,
        borderRadius: '10px',
        border: `1px solid ${palette.primary.boxBorder}`,
        minWidth: '70%',
        maxWidth: '90%',
      }}
    >
      {isLoading || isFetching ? (
        <Skeleton variant="rectangular" width="100%" height={'100px'} />
      ) : (
        <Link href={`/profile/${data?.username}`}>
          {' '}
          <Stack alignItems="center" gap={1}>
            <Avatar src={data?.avatar} />
            <Stack alignItems="center" justifyContent="center">
              <ProfileName
                variant="subtitle2"
                sx={{
                  textAlign: 'center',
                }}
              >
                {data?.name}
              </ProfileName>
              <UsernameLink
                variant="subtitle2"
                username={data?.username ?? ''}
              />
              <Stack direction="row" gap={1}>
                <Typography
                  display="inline-flex"
                  variant="caption"
                  color="textPrimary"
                >
                  Followers
                  <span style={{ color: palette.primary.main }}>
                    &nbsp;{data?.numberOfFollowers}
                  </span>
                </Typography>
                <Typography variant="caption" color="textPrimary">
                  Following
                  <span style={{ color: palette.primary.main }}>
                    {' '}
                    {data?.numberOfFollowing}
                  </span>
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Link>
      )}
    </Paper>
  );
};

export default SidebarProfileBar;
