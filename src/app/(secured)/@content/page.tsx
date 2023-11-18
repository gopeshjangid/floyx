import AddPost from "@/components/Post/AddPost"
import PostList from "@/components/Post/PostList"
import PostHeader from "@/components/PostHeader"

import { Box, Grid } from "@mui/material"

export default function Page({}) {
  return (
    <Grid sx={{ width:  { xs: '100%', md: '70%' } }}>
      <PostHeader />
      <AddPost />
      <PostList />
    </Grid>
  )
}
