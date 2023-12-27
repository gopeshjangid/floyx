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
} from '@mui/material';
import {
  BorderColorOutlined,
  ChevronLeft,
  LocationOn,
} from '@mui/icons-material';
import {
  ProfileInfoType,
  useFollowUserMutation,
  //useGetCurrentProfileDetailsQuery,
  useGetProfileAboutQuery,
  useGetProfileDetailsQuery,
  useUpdateProfileDetailMutation,
} from '@/lib/redux/slices/profile';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Calender from '@/assets/images/icons/calendar.svg';
import LinkIcon from '@/assets/images/icons/link.svg';
//import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BlockReportUser from './blockReportUser';
import UsernameLink from '@/components/usernameLink';
import { useToast } from '@/components/Toast/useToast';
import { useSession } from 'next-auth/react';
import CustomChip from '@/components/CustomGridientChip';
import ImageUploader from '@/components/ImageUploader';
import TextareaAutosize from '@/components/CustomTextArea';
import ButtonWithLoading from '@/components/ButtonWithLoading';
import { RoundPrimaryButton } from '@/components/CustomButtons';
interface ProfileFollowerWrapperProps extends BoxProps {
  isMobile: boolean;
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

const ProfileCover = styled(Box)<Omit<ProfileFollowerWrapperProps, 'isMobile'>>(
  () => ({
    height: '280px',
    borderRadius: '10px',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  })
);

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

const OtherUserProfileActions: React.FC<{
  username: string;
  allowPrivateMassages: boolean;
}> = ({ username, allowPrivateMassages }) => {
  const toast = useToast();
  const { data: accountDetail, isError: AccountLoadError } =
    useGetProfileDetailsQuery({ username: username! });

  const [followUser, { isSuccess, isLoading, isError }] =
    useFollowUserMutation();
  const router = useRouter();

  React.useEffect(() => {
    if (isSuccess) {
      toast.success(
        `${!accountDetail?.followed ? 'Followed' : 'UnFollowed'} successfully`
      );
    }

    if (isError) {
      toast.error(
        `Error occured in ${
          !accountDetail?.followed ? 'Following' : 'UnFollowing'
        }`
      );
    }
  }, [isSuccess, isError]);
  return (
    <Stack
      justifyContent="flex-end"
      mt={2}
      alignItems="center"
      direction="row"
      gap={1}
      pr={2}
    >
      <React.Suspense fallback={<Typography>Loading...</Typography>}>
        <BlockReportUser username={username} onSuccess={() => {}} />
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
      <ButtonWithLoading
        isLoading={isLoading}
        isSuccess={isSuccess}
        variant="contained"
        onClick={() => followUser({ username })}
        disabled={AccountLoadError}
        isError={isError}
      >
        {accountDetail?.followed ? 'Unfollow' : 'Follow'}
      </ButtonWithLoading>
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
  const isSameuser = session.data?.user.username === username;
  const isMobile = useMediaQuery('(max-width:480px)');
  const { data: profile, isLoading } = useGetProfileDetailsQuery(
    { username: username! },
    {
      skip: !username,
    }
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
    updateProfile(formData);
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
                  <Typography
                    variant="subtitle1"
                    sx={{ color: palette.primary.fontLightColor }}
                  >
                    {profile?.name}
                  </Typography>
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
                    //layout="fill"
                    fill
                    objectFit="cover"
                    objectPosition="center"
                    src={
                      isEdit && imagePreview.cover
                        ? imagePreview.cover
                        : profile?.backgroundImage
                    }
                  />
                ) : (
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    sx={{ width: '100%', height: '200px' }}
                  />
                )}
              </React.Suspense>
              {isEdit && (
                <ProfileCoverUploader>
                  <ImageUploader
                    onImageUpload={onCoverUploaded}
                    getPreviewData={getCoverPreviewData}
                  />
                </ProfileCoverUploader>
              )}
              {!isEdit && (
                <ProfileFollowerWrapper
                  isMobile={isMobile}
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
              <ProfileFollowerWrapper top="70%" isMobile={isMobile}>
                <Box display="flex" p={1} alignItems="center" gap={1}>
                  <Typography variant="subtitle2">Following</Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: 'rgba(87, 152, 255, 1)', fontWeight: 500 }}
                  >
                    {profile?.numberOfFollowing}
                  </Typography>
                  <Typography>|</Typography>
                  <Typography variant="subtitle2">Followers</Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: 'rgba(87, 152, 255, 1)', fontWeight: 500 }}
                  >
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
                <ProfilePicUploader>
                  <ImageUploader
                    onImageUpload={onProfileUploaded}
                    getPreviewData={getProfilePreviewData}
                  />
                </ProfilePicUploader>
              )}
            </Box>
          )}
        </ProfilePic>
        {!isLoading && (
          <Box mt={isMobile ? 8 : 0}>
            {!isSameuser ? (
              <OtherUserProfileActions
                allowPrivateMassages={!!profile?.allowPrivateMassages}
                username={username ?? ''}
              />
            ) : null}
          </Box>
        )}
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
                <Typography
                  variant="body2"
                  sx={{ color: palette.primary.fontLightColor }}
                >
                  {profile?.name}
                </Typography>
                <UsernameLink username={profile?.username ?? ''} />
              </>
            )}
          </Stack>
          <Box my={2}>
            {!isEdit ? (
              <Typography
                textAlign="justify"
                variant="subtitle2"
                color="textPrimary"
              >
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height="60px" />
                ) : (
                  profile?.shortDescription
                )}
              </Typography>
            ) : (
              <TextareaAutosize
                onChange={event =>
                  setForm(form => ({
                    ...form,
                    shortDescription: event.target.value,
                  }))
                }
                placeholder="Enter short description..."
                value={form.shortDescription}
                minRows={2}
              />
            )}
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
