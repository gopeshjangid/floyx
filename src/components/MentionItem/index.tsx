import { Box } from "@mui/material";
import UserCard from "../UserCard";
import UserAvatar from "../UserAvatar";
import { ApiEndpoint } from "@/lib/API/ApiEndpoints";

export default function MentionItem(user: any) {
  return (
    <Box>
      <UserAvatar
        src={`${ApiEndpoint.ProfileDetails}/avatar/${user.username}`}
        alt={user.username}
        sx={{ width: '49px', height: '49px' }}
      />
      {user.name}
      {`$${user.username}`}
    </Box>
  )
}