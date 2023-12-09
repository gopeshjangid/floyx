/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import * as React from 'react';
import {
  Box,
  Stack,
  Typography,
  IconButton,
  styled,
  useMediaQuery,
  Paper,
  useTheme,
  Chip,
  Skeleton,
  Avatar,
  Button,
  BoxProps,
} from '@mui/material';
import {
  BorderColorOutlined,
  ChevronLeft,
  LocationOn,
} from '@mui/icons-material';
import {
  //useGetCurrentProfileDetailsQuery,
  useGetProfileAboutQuery,
  useGetProfileDetailsQuery,
} from '@/lib/redux/slices/profile';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Calender from '@/assets/images/icons/calendar.svg';
import LinkIcon from '@/assets/images/icons/link.svg';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BlockReportUser from './blockReportUser';
import UsernameLink from '@/components/usernameLink';

interface ProfileFollowerWrapperProps extends BoxProps {
  isMobile: boolean;
}

const ProfileFollowerWrapper = styled(Box)<ProfileFollowerWrapperProps>(
  ({ theme, ...props }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: 1,
    color: theme.palette.common.white,
    position: 'absolute',
    bottom: props.isMobile ? '' : '20px',
    right: '16px',
    borderRadius: '10px',
    overflow: 'hidden',
  })
);

const ProfileCover = styled(Box)<ProfileFollowerWrapperProps>(() => ({
  height: '280px',
  borderRadius: '10px',
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
}));

const ProfilePic = styled(Box)<ProfileFollowerWrapperProps>(
  ({ theme, ...props }) => ({
    top: props?.isMobile ? '32%' : '39%',
    left: '13px',
    background: theme.palette.background.default,
    borderRadius: '50px',
    width: '100px',
    height: '100px',
    position: 'absolute',
  })
);

const OtherUserProfileActions: React.FC<{ username: string }> = ({
  username,
}) => {
  const router = useRouter();
  return (
    <Stack
      justifyContent="flex-end"
      mt={2}
      alignItems="center"
      direction="row"
      gap={1}
    >
      <React.Suspense fallback={<Typography>Loading...</Typography>}>
        <BlockReportUser username={username} onSuccess={() => {}} />
      </React.Suspense>

      <Button
        onClick={() => router.push('/inbox')}
        variant="contained"
        startIcon={<EmailOutlinedIcon color="primary" />}
      >
        Message
      </Button>
      <Button
        variant="contained"
        //onClick={() => router.push('/inbox')}
      >
        Follow
      </Button>
      <IconButton>
        <NotificationAddOutlinedIcon color="primary" />
      </IconButton>
    </Stack>
  );
};

// Example usage of the styled components
const ProfileSection: React.FC = () => {
  const params = useParams();
  const username = Array.isArray(params?.username)
    ? params?.username[0]
    : params?.username || '';

  const isMobile = useMediaQuery('(max-width:480px)');
  const { data: profile, isLoading } = useGetProfileDetailsQuery(
    { username },
    {
      skip: !username,
    }
  );
  // const {
  //   data: currentProfile,
  //   isLoading: currnetProfileLoading,
  //   error: currentProfileError,
  // } = useGetCurrentProfileDetailsQuery();
  const { data: profileAbout, isLoading: aboutLoading } =
    useGetProfileAboutQuery({ username });
  const { palette } = useTheme();

  return (
    <Box mt={4}>
      <Box my={2} display="flex" alignItems="center">
        <IconButton>
          <ChevronLeft color="secondary" />
        </IconButton>
        <Stack direction="row" spacing={{ xs: 1, sm: 1, md: 1 }}>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              sx={{ width: '100%', height: '20px' }}
            />
          ) : (
            <>
              <Typography variant="body2" color="textPrimary">
                {profile?.name}
              </Typography>
              <UsernameLink username={profile?.username ?? ''} />
            </>
          )}
        </Stack>
      </Box>

      <Paper
        sx={{
          borderRadius: '10px',
          position: 'relative',
        }}
      >
        <ProfileCover isMobile={isMobile}>
          {isLoading && !profile ? (
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ width: '100%', height: '200px' }}
            />
          ) : (
            <>
              <React.Suspense
                fallback={
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    sx={{ width: '100%', height: '200px' }}
                  />
                }
              >
                {profile?.backgroundImage ? (
                  <Image
                    alt="profile image"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    src={profile?.backgroundImage}
                  />
                ) : (
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    sx={{ width: '100%', height: '200px' }}
                  />
                )}
              </React.Suspense>
              <ProfileFollowerWrapper
                isMobile={isMobile}
                sx={{ top: '16px', right: '16px' }}
              >
                <Box display="flex" p={1} gap={1} bgcolor="#0B081F">
                  <Button startIcon={<BorderColorOutlined fontSize="small" />}>
                    Edit Profile
                  </Button>
                </Box>
              </ProfileFollowerWrapper>
              <ProfileFollowerWrapper isMobile={isMobile}>
                <Box display="flex" p={1} gap={1} bgcolor="#0B081F">
                  <Typography variant="subtitle1">Following</Typography>
                  <Typography variant="subtitle1" color="primary">
                    {profile?.numberOfFollowing}
                  </Typography>
                  <Typography>|</Typography>
                  <Typography variant="subtitle1">Followers</Typography>
                  <Typography variant="subtitle1" color="primary">
                    {profile?.numberOfFollowers}
                  </Typography>
                </Box>
              </ProfileFollowerWrapper>
            </>
          )}
        </ProfileCover>
        <ProfilePic isMobile={isMobile}>
          {isLoading && !profile ? (
            <Skeleton
              variant="circular"
              animation="wave"
              sx={{
                width: '92%',
                height: '92%',
                left: '3.5%',
                top: '3%',
                position: 'relative',
              }}
            />
          ) : (
            <Avatar
              src={profile?.avatar}
              sx={{
                width: '92%',
                height: '92%',
                left: '3.5%',
                top: '3%',
                border: `3px solid ${palette.primary.main}`,
              }}
            />
          )}
        </ProfilePic>
        <Box mt={isMobile ? 8 : 0}>
          <OtherUserProfileActions username={username ?? ''} />
        </Box>
        <Box mt={6} p={2} textAlign="center">
          <Stack direction="row" spacing={{ xs: 1, sm: 1, md: 1 }}>
            {isLoading ? (
              <Skeleton
                animation="wave"
                variant="rectangular"
                sx={{ width: '100%', height: '20px' }}
              />
            ) : (
              <>
                <Typography variant="body2" color="textPrimary">
                  {profile?.name}
                </Typography>
                <UsernameLink username={profile?.username ?? ''} />
              </>
            )}
          </Stack>
          <Box my={2}>
            <Typography
              textAlign="justify"
              variant="subtitle2"
              color="textPrimary"
            >
              {isLoading ? (
                <Skeleton variant="rectangular" height="60px" />
              ) : (
                profile?.shortDescription
              )}
            </Typography>
          </Box>
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={1}
            spacing={{ xs: 0, sm: 3, md: 4 }}
          >
            {aboutLoading ? (
              <Skeleton variant="rectangular" height={'30px'} width="100%" />
            ) : (
              <>
                <Box display="flex" gap={1}>
                  <LocationOn />
                  <Typography variant="body2" color="textPrimary">
                    {profileAbout?.about?.location}
                  </Typography>
                </Box>
                <Box display="flex" gap={1}>
                  <Image src={LinkIcon} alt="website link icon" />
                  <Typography variant="subtitle2" color="textPrimary">
                    {profileAbout?.about?.website}
                  </Typography>
                </Box>
                <Box display="flex" gap={1}>
                  <Image src={Calender} alt="Calender Icon" />
                  <Typography variant="subtitle2" color="primary">
                    Joined Sept 1990
                  </Typography>
                </Box>
              </>
            )}
          </Stack>
          <Box my={2}>
            <Typography textAlign="left" variant="body1">
              {!aboutLoading && 'Skills'}
            </Typography>
            <Stack
              flexWrap="wrap"
              my={2}
              display="flex"
              direction="row"
              justifyContent="flex-start"
              rowGap={2}
              spacing={{ xs: 1, sm: 3, md: 4 }}
            >
              {aboutLoading ? (
                <Skeleton variant="rectangular" width="100%" height="100px" />
              ) : (
                profileAbout &&
                profileAbout?.about?.skills.map((skill, index) => (
                  <Chip
                    key={'skill' + index}
                    label={skill}
                    component="a"
                    href="#basic-chip"
                    clickable
                  />
                ))
              )}
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default React.memo(ProfileSection);
