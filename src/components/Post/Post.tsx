import { Box, Typography } from "@mui/material"
import DateParser from "../DateParser"
import UserCard from "../UserCard"
import { PostBox } from "./styledPostBox"
import SplitButton from "../SplitButton"
import PostImage from "./PostImage"
import LikeCommentShare from "./LikeCommentShare"
import AddComment from "./AddComment"

export default function Post({
  name,
  username,
  createdDateTime,
  content,
  shared,
  image,
  link,
  isShared,
  postDetails,
  avatar,
  postId,
}: any) {

  return (
    <PostBox>
      <Box sx={{ margin: "0rem 1rem 1rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <UserCard
            name={name}
            username={username}
            timestamp={createdDateTime}
            shared={shared}
          />
          <SplitButton />
        </Box>
        <Box>
          <Typography variant="h6">
            {content}
          </Typography>
        </Box>
        <PostImage image={image} link={link} shared={shared} isShared={isShared} postId={postId} />
        <LikeCommentShare postDetails={postDetails}/>
        <AddComment avatar={avatar}/>
      </Box>
    </PostBox>
  )
}
