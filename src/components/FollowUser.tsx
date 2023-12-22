'use client';
import { useFollowUserMutation } from '@/lib/redux/slices/profile';
import ButtonWithLoading from './ButtonWithLoading';

export default function FollowUser({
  username,
  isFollowed,
}: {
  username: string;
  isFollowed?: boolean;
}) {
  const [
    followUser,
    { isLoading: isFollowing, isSuccess, isError: followError },
  ] = useFollowUserMutation();

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
    >
      {isFollowed ? 'Unfollow' : 'Follow'}
    </ButtonWithLoading>
  );
}
