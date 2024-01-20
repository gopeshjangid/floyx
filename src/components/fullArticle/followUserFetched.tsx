"use client";

import { useGetProfileDetailsQuery } from "@/lib/redux/slices/profile";
import FollowUser from "../FollowUser";

export default function FollowUserFetched({username}) {
  const { data: profile } = useGetProfileDetailsQuery(
    { username: username },
    { skip: !username }
  );

  return (
    <FollowUser
      isFollowed={profile?.followed}
      username={username}
    />
  )
}