"use client";

import { Box, Typography } from "@mui/material"
import DateParser from "../DateParser"
import UserCard from "../UserCard"
import { PostBox } from "./styledPostBox"
import SplitButton from "../SplitButton"
import PostImage from "./PostImage"
import LikeCommentShare from "./LikeCommentShare"
import AddComment from "./AddComment"
import CommentList from "../CommentLists"

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
  commentList,
}: any) {
  const handleOptions = (val: any) => {
    console.log(val, postId)
  }
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
          <Box sx={{padding: '20px 0'}}>
            <SplitButton 
              options={['Delete Post', 'Delete Link']}
              handleOptions={handleOptions}
            />
          </Box>
        </Box>
        <Box>
          <Typography variant="h6">
            {content}
          </Typography>
        </Box>
        <PostImage image={image} link={link} shared={shared} isShared={isShared} postId={postId} />
        <LikeCommentShare postDetails={postDetails} />
        <CommentList comments={commentList} />
        <AddComment avatar={avatar}/>
      </Box>
    </PostBox>
  )
}
