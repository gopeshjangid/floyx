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
import UsernameLink from './usernameLink';
import { useSession } from 'next-auth/react';

const SidebarProfileBar: React.FC = () => {
  const { palette } = useTheme();
  const session = useSession();
  const username = (session as any)?.data?.user?.username ?? '';
  const { data, isLoading } = useGetProfileDetailsQuery(
    {
      username: username!,
    },
    { skip: !username }
  );
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: 'none',
        padding: 1,
        borderRadius: '10px',
        border: `1px solid ${palette.primary.boxBorder}`,
        minWidth: '70%',
        maxWidth: '85%',
      }}
    >
      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height={'100px'} />
      ) : (
        <Stack alignItems="center" gap={1}>
          <Avatar src={data?.avatar} />
          <Stack alignItems="center">
            <Typography variant="subtitle1" color="textPrimary">
              {data?.name}
            </Typography>
            <UsernameLink variant="subtitle2" username={data?.username ?? ''} />
            <Stack direction="row" gap={1}>
              <Typography
                display="inline-flex"
                variant="caption"
                color="textPrimary"
              >
                Followers &nbsp;
                <span style={{ color: palette.primary.main }}>
                  {data?.numberOfFollowers}
                </span>
              </Typography>
              <Typography variant="caption" color="textPrimary">
                Following &nbsp;
                <span style={{ color: palette.primary.main }}>
                  {data?.numberOfFollowing}
                </span>
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Paper>
  );
};

export default SidebarProfileBar;
