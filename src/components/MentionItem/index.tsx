import { Box, Typography } from "@mui/material";
import UserAvatar from "../UserAvatar";

export default function MentionItem(user: any) {

  return (
    <Box
      display={"flex"}
      margin={2}
      alignItems={"center"}
      sx={{backgroundColor: "background.default"}}
    >
      <UserAvatar
        src={user.user.avatar}
        alt={user.user.display}
        sx={{ width: '49px', height: '49px' }}
      />
      <Typography
        component="span"
        variant="subtitle2"
        sx={{ margin: "0 8px" }}
      >
        {user.user.display}
      </Typography>
      <Typography
        component="span"
        variant="subtitle2"
        color="primary"
        sx={{ cursor: 'pointer', textDecoration: 'none' }}
      >
        {user.user.id}
      </Typography>
    </Box>
  )
}