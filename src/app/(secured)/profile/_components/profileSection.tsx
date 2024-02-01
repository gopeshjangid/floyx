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
  Skeleton,
  Avatar,
  Button,
  BoxProps,
  LinearProgress,
  Alert,
  Tooltip,
  FormHelperText,
} from '@mui/material';
import {
  BorderColorOutlined,
  ChevronLeft,
  LocationOn,
} from '@mui/icons-material';
import {
  ProfileInfoType,
  useGetCurrentProfileDetailsQuery,
  //useGetCurrentProfileDetailsQuery,
  useGetProfileAboutQuery,
  useGetProfileDetailsQuery,
  useIsUserFollowedQuery,
  useUpdateProfileDetailMutation,
} from '@/lib/redux/slices/profile';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Calender from '@/assets/images/icons/calendar.svg';
import LinkIcon from '@/assets/images/icons/link.svg';
//import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BlockReportUser from './blockReportUser';
import UsernameLink, { ProfileName } from '@/components/usernameLink';
import { useToast } from '@/components/Toast/useToast';
import { useSession } from 'next-auth/react';
import CustomChip from '@/components/CustomGridientChip';
import ImageUploader from '@/components/ImageUploader';
import { RoundPrimaryButton } from '@/components/CustomButtons';
import FollowUser from '@/components/FollowUser';
import TextareaAutosize from '@/components/CustomTextArea';
import Link from 'next/link';
import CustomDescription from '@/components/customDescription';
interface ProfileFollowerWrapperProps extends BoxProps {
  top?: string;
}

const ProfileFollowerWrapper = styled(Box)<ProfileFollowerWrapperProps>(
  ({ theme, ...props }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: 1,
    color: theme.palette.common.white,
    position: 'absolute',
    bottom: 'unset',
    top: props.top,
    right: '16px',
    borderRadius: '10px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    backgroundColor: 'rgba(11, 8, 31, 0.7)',
  })
);

const ProfileCoverUploader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: 1,
  color: theme.palette.primary.iconFontColor,
  position: 'absolute',
  top: '50%',
  right: '50%',
  borderRadius: '10px',
  overflow: 'hidden',
  background: theme.palette.primary.main,
}));

const ProfilePicUploader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: 1,
  color: theme.palette.primary.iconFontColor,
  position: 'absolute',
  top: '52%',
  right: '19%',
  borderRadius: '10px',
  overflow: 'hidden',
  zIndex: 9999,
  background: theme.palette.primary.main,
}));

const ProfileCover = styled(Box)<ProfileFollowerWrapperProps>(() => ({
  height: '280px',
  borderRadius: '10px',
  width: '100%',
  position: 'relative',
}));

const ProfilePic = styled(Box)<ProfileFollowerWrapperProps>(({ theme }) => ({
  top: '82%',
  left: '13px',
  background: theme.palette.background.default,
  borderRadius: '50px',
  width: '100px',
  height: '100px',
  position: 'absolute',
}));

const OtherUserProfileActions: React.FC<{
  username: string;
  allowPrivateMassages: boolean;
}> = ({ username, allowPrivateMassages }) => {
  const {
    data: accountDetail,
    isError: AccountLoadError,
    isLoading,
  } = useGetProfileDetailsQuery({ username: username! });
  const router = useRouter();

  const OnSuccessBlock = React.useCallback(() => {}, []);

  return (
    <Stack
      justifyContent="flex-end"
      mt={2}
      alignItems="center"
      direction="row"
      gap={1}
      pr={2}
    >
      {AccountLoadError && !accountDetail && (
        <Box>
          <Alert variant="outlined" severity="error">
            Error in loading profile
          </Alert>
        </Box>
      )}
      {isLoading && <Skeleton width="100%" height="40px" />}
      {!isLoading && accountDetail && (
        <>
          <React.Suspense fallback={<Typography>Loading...</Typography>}>
            <BlockReportUser username={username} onSuccess={OnSuccessBlock} />
          </React.Suspense>

          {allowPrivateMassages && (
            <RoundPrimaryButton
              onClick={() => router.push('/inbox/' + username)}
              variant="contained"
              startIcon={<EmailOutlinedIcon color="primary" />}
            >
              Message
            </RoundPrimaryButton>
          )}
          <FollowUser
            username={username}
            isFollowed={accountDetail?.followed}
          />
        </>
      )}

      {/* <IconButton>
        <NotificationAddOutlinedIcon color="primary" />
      </IconButton> */}
    </Stack>
  );
};

// Example usage of the styled components
const ProfileSection: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { palette } = useTheme();
  const toast = useToast();
  const [isEdit, setIsEdit] = React.useState(false);
  const [form, setForm] = React.useState<Partial<ProfileInfoType>>({
    avatar: null, // Assuming 'avatar' is an object, you might want to define a more specific type if possible
    backgroundImage: null, // 'binary' often refers to a Blob type in the context of file data
    shortDescription: '',
    deleteAvatar: false,
  });
  const [imagePreview, setImagePreview] = React.useState({
    cover: null,
    profile: null,
  });
  const username = Array.isArray(params?.username)
    ? params?.username[0] ?? ''
    : params?.username || '';
  const session = useSession();
  const { data: currentUser } = useGetCurrentProfileDetailsQuery(undefined, {
    skip: session.status !== 'authenticated',
  });
  const isSameuser = session.data?.user.username === username;
  const isMobile = useMediaQuery('(max-width:480px)');
  const { data: profile, isLoading } = useGetProfileDetailsQuery(
    { username: username! },
    {
      skip: !username,
    }
  );

  const { data: isFollwed } = useIsUserFollowedQuery(
    { userId: currentUser?.userId ?? '', followedId: profile?.id ?? '' },
    { skip: !currentUser?.userId || !profile?.id || isSameuser }
  );
  const [
    updateProfile,
    { isLoading: isUpdating, isSuccess: isUpdated, isError: updateError },
  ] = useUpdateProfileDetailMutation();

  const onCoverUploaded = data => {
    setForm(form => ({ ...form, backgroundImage: data }));
  };

  const getCoverPreviewData = data => {
    setImagePreview(preview => ({ ...preview, cover: data }));
  };

  React.useEffect(() => {
    if (isUpdated) {
      toast.success('Profile updated!');
      setIsEdit(false);
    }

    if (updateError) {
      toast.error('Error occured in profile updating!');
    }
  }, [isUpdated, updateError]);

  React.useEffect(() => {
    if (profile) {
      setForm(form => ({
        ...form,
        shortDescription: profile.shortDescription,
      }));
    }
  }, [profile]);

  const onProfileUploaded = data => {
    setForm(form => ({ ...form, avatar: data }));
  };

  const getProfilePreviewData = data => {
    setImagePreview(preview => ({ ...preview, profile: data }));
  };
  const { data: profileAbout, isLoading: aboutLoading } =
    useGetProfileAboutQuery({ username: username! });

  const onUpdateSubmit = () => {
    const formData = new FormData();
    formData.append('avatar', form.avatar ? (form.avatar as any) : '');
    if (form.backgroundImage) {
      formData.append('backgroundImage', form.backgroundImage);
    }
    formData.append('shortDescription', String(form.shortDescription));
    formData.append('deleteAvatar', Boolean(form.deleteAvatar) as any); // Convert boolean to string
    formData.append('deleteBgImage', Boolean('') as any); // Convert boolean to string
    formData.append('username', username);
    updateProfile(formData);
  };

  const handleUrl = url => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.open(`http://${url}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Box mt={4}>
      <Box my={2}>
        <Stack direction="row" flexWrap={'wrap'}>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              sx={{ width: '100%', height: '20px' }}
            />
          ) : (
            <>
              {!isEdit && (
                <Stack direction="row" gap={0} alignItems={'center'}>
                  <IconButton
                    onClick={() => router.back()}
                    sx={{ marginBottom: '4px' }}
                  >
                    <ChevronLeft fontSize="medium" color="secondary" />
                  </IconButton>
                  <ProfileName variant="subtitle1">{profile?.name}</ProfileName>
                  &nbsp;
                  <UsernameLink username={profile?.username ?? ''} />
                </Stack>
              )}
              {isEdit && (
                <Stack
                  width={'100%'}
                  direction="row"
                  gap={2}
                  justifyContent={'space-between'}
                >
                  <Typography>Edit Profile</Typography>
                  <Stack direction="row" gap={1}>
                    <Button
                      disabled={isUpdating}
                      onClick={onUpdateSubmit}
                      variant="contained"
                    >
                      Save changes
                    </Button>
                    <Button onClick={() => setIsEdit(false)} variant="text">
                      Cancel
                    </Button>
                  </Stack>
                </Stack>
              )}
            </>
          )}
        </Stack>
      </Box>

      <Paper
        sx={{
          borderRadius: '10px',
          position: 'relative',
          border: `1px solid ${palette.primary.boxBorder}`,
          background: palette.primary.mainBackground,
        }}
      >
        {isUpdating && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        )}
        <ProfileCover>
          {isLoading && !profile ? (
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ width: '100%', height: '200px' }}
            />
          ) : (
            <Box sx={{ overflow: 'hidden', borderRadius: '10px' }}>
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
                  <Box sx={{ overflow: 'hidden', borderRadius: '10px' }}>
                    <Image
                      alt="profile image"
                      style={{ borderRadius: '10px' }}
                      fill
                      objectFit="cover"
                      objectPosition="center"
                      src={
                        isEdit && imagePreview.cover
                          ? imagePreview.cover
                          : profile?.backgroundImage
                      }
                    />
                  </Box>
                ) : (
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    sx={{ width: '100%', height: '200px' }}
                  />
                )}
              </React.Suspense>
              {isEdit && (
                <Tooltip title="Please use a background photo with a minimum resolution of 1200x900 pixels or higher for the best results">
                  <ProfileCoverUploader>
                    <ImageUploader
                      onImageUpload={onCoverUploaded}
                      getPreviewData={getCoverPreviewData}
                    />
                  </ProfileCoverUploader>
                </Tooltip>
              )}
              {!isEdit && isSameuser && (
                <ProfileFollowerWrapper
                  top="4%"
                  sx={{ top: '16px', right: '16px' }}
                >
                  <Box display="flex" p={1} gap={1}>
                    <Button
                      onClick={() => setIsEdit(true)}
                      color="inherit"
                      startIcon={<BorderColorOutlined fontSize="small" />}
                    >
                      Edit Profile
                    </Button>
                  </Box>
                </ProfileFollowerWrapper>
              )}
              <ProfileFollowerWrapper top="70%">
                <Box display="flex" p={1} alignItems="center" gap={1}>
                  <Link href={`/profile/${username}/following`}>
                    <Typography variant="subtitle2">Following</Typography>
                  </Link>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: 'rgba(87, 152, 255, 1)', fontWeight: 500 }}
                  >
                    {profile?.numberOfFollowing}
                  </Typography>
                  <Typography>|</Typography>
                  <Link href={`/profile/${username}/followers`}>
                    <Typography variant="subtitle2">Followers</Typography>
                  </Link>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: 'rgba(87, 152, 255, 1)', fontWeight: 500 }}
                  >
                    {profile?.numberOfFollowers}
                  </Typography>
                </Box>
              </ProfileFollowerWrapper>
            </Box>
          )}
          <ProfilePic>
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
              <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
                <Avatar
                  src={
                    isEdit && imagePreview.profile
                      ? imagePreview.profile
                      : profile?.avatar
                  }
                  sx={{
                    width: '92%',
                    height: '92%',
                    left: '3.5%',
                    top: '3%',
                    border: `3px solid ${palette.primary.main}`,
                  }}
                />
                {isEdit && (
                  <Tooltip title="For optimal profile picture quality, use a minimum resolution of 400x400 pixels or higher.">
                    <ProfilePicUploader>
                      <ImageUploader
                        onImageUpload={onProfileUploaded}
                        getPreviewData={getProfilePreviewData}
                      />
                    </ProfilePicUploader>
                  </Tooltip>
                )}
              </Box>
            )}
          </ProfilePic>
        </ProfileCover>

        {!isLoading && (
          <Box mt={isMobile ? 8 : 0}>
            {!isSameuser && session.status === 'authenticated' ? (
              <OtherUserProfileActions
                allowPrivateMassages={!!profile?.allowPrivateMassages}
                username={username ?? ''}
              />
            ) : (
              <Box height="50px" width="100%">
                &nbsp;
              </Box>
            )}
          </Box>
        )}
        <Box mt={1} p={2} pt={isEdit ? 5 : 2} textAlign="center">
          <Stack
            alignItems={'center'}
            direction="row"
            spacing={{ xs: 1, sm: 1, md: 1 }}
          >
            {isLoading ? (
              <Skeleton
                animation="wave"
                variant="rectangular"
                sx={{ width: '100%', height: '20px' }}
              />
            ) : (
              <>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: '500',
                    color: palette.primary.fontLightColor,
                  }}
                >
                  {profile?.name}
                </Typography>
                <UsernameLink variant="h6" username={profile?.username ?? ''} />
                {isFollwed && (
                  <>
                    &nbsp;|
                    <Typography color="primary" variant="body2">
                      Follows you
                    </Typography>
                  </>
                )}
              </>
            )}
          </Stack>
          <Box my={2}>
            {!isEdit ? (
              <CustomDescription
                textAlign="justify"
                variant="subtitle2"
                sx={{
                  opacity: 0.9,
                  color: palette.mode === 'dark' ? '#fff' : '#000',
                }}
              >
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height="60px" />
                ) : (
                  profile?.shortDescription
                )}
              </CustomDescription>
            ) : (
              <>
                <TextareaAutosize
                  onChange={event =>
                    setForm(form => ({
                      ...form,
                      shortDescription: event.target.value,
                    }))
                  }
                  placeholder="Enter short description..."
                  value={form.shortDescription}
                  minRows={5}
                  maxLength={600}
                  sx={{ color: palette.mode === 'dark' ? '#fff' : '#000' }}
                />
                <FormHelperText sx={{ textAlign: 'right' }}>
                  {`${form.shortDescription?.length ?? 0}/600`}
                </FormHelperText>
              </>
            )}
          </Box>
          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            justifyContent={'flex-start'}
            gap={0.5}
            spacing={{ xs: 0, sm: 1, md: 1 }}
          >
            {aboutLoading ? (
              <Skeleton variant="rectangular" height={'30px'} width="100%" />
            ) : (
              <Stack direction={'row'} gap={1} alignItems={'flex-end'}>
                <Box display="flex" gap={1}>
                  <LocationOn />
                  <Typography variant="body2" color="textPrimary">
                    {profileAbout?.about?.location}
                  </Typography>
                </Box>
                <Box display="flex" gap={1}>
                  <Button
                    variant="text"
                    size="small"
                    startIcon={<Image src={LinkIcon} alt="website link icon" />}
                    onClick={() => handleUrl(profileAbout?.about?.website)}
                    sx={{ fontSize: '.825rem', textTransform: 'none' }}
                  >
                    {profileAbout?.about?.website}
                  </Button>
                </Box>
                <Box display="flex" gap={1}>
                  <Image
                    src={Calender}
                    width={20}
                    height={20}
                    alt="Calender Icon"
                  />
                  <Typography variant="subtitle2" sx={{ color: 'grey' }}>
                    {profile?.joinedDate}
                  </Typography>
                </Box>
              </Stack>
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
                  <CustomChip
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
