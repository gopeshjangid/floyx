import AddPost from "@/components/Post/AddPost";
import PostList from "@/components/Post/PostList";
import PostHeader from "@/components/PostHeader";

import { Box } from "@mui/material";

export default function Loading({}) {
  return (
    <Box>
      <PostHeader />
      <AddPost />
      <PostList />
    </Box>
  )
}