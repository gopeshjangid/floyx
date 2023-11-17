import AddPost from "@/components/Post/AddPost"
import PostList from "@/components/Post/PostList"
import PostHeader from "@/components/PostHeader"

import { Box } from "@mui/material"

export default function Page({}) {
  return (
    <Box sx={{ width: '70%' }}>
      <PostHeader />
      <AddPost />
      <PostList />
    </Box>
  )
}
