'use client';
import { useFollowUserMutation } from '@/lib/redux/slices/profile';
import ButtonWithLoading from './ButtonWithLoading';
import { RefreshOutlined } from '@mui/icons-material';
import { useEffect } from 'react';

export default function FollowUser({
  username,
  isFollowed,
  onSuccess = () => {},
  onError = () => {},
}: {
  username: string;
  isFollowed?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const [
    followUser,
    { isLoading: isFollowing, isSuccess, isError: followError },
  ] = useFollowUserMutation();

  useEffect(() => {
    if (isSuccess) onSuccess();
  }, [isSuccess]);

  useEffect(() => {
    if (followError) onError();
  }, [followError]);

  const followAccount = () => {
    followUser({ username });
  };

  return (
    <ButtonWithLoading
      onClick={followAccount}
      variant="outlined"
      isLoading={isFollowing}
      isSuccess={isSuccess}
      isError={followError}
      buttonType="ROUND"
      startIcon={followError && <RefreshOutlined />}
      sx={{
        '&:hover': {
          backgroundColor: isFollowed
            ? 'red !important'
            : 'rgba(87, 152, 255, 0.23) !important',
          color: 'white !important',
        },
      }}
    >
      {followError
        ? 'Retry'
        : isFollowed
          ? `Unfollow${isFollowing ? 'ing' : ''}`
          : `Follow${isFollowing ? 'ing' : ''}`}
    </ButtonWithLoading>
  );
}
