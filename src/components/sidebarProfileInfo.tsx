import {
  Avatar,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useLazyGetProfileDetailsQuery } from '@/lib/redux/slices/profile';
import UsernameLink, { ProfileName } from './usernameLink';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const SidebarProfileBar: React.FC = () => {
  const { palette } = useTheme();
  const session = useSession();
  const username = (session as any)?.data?.user?.username ?? '';
  const [fetchProfileDetails,{ data, isFetching, isLoading }] = useLazyGetProfileDetailsQuery();
const {t}=useTranslation()

  useEffect(()=>{
   if(username){
    fetchProfileDetails({username});
   }
  },[session, username]);

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
                  translate="no"
                  display="inline-flex"
                  variant="caption"
                  color="textPrimary"
                >
                  {t('comp.fullArticle.follower')}
                  <span style={{ color: palette.primary.main }}>
                    &nbsp;{data?.numberOfFollowers}
                  </span>
                </Typography>
                <Typography translate="no" variant="caption" color="textPrimary">
                 
                  {t('Home.followSection.following')}
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

export default React.memo(SidebarProfileBar);
