import * as React from "react"
import Box from "@mui/material/Box"
import AddPost from "@/components/Post/AddPost"
import FriendsActivity from "@/components/FriendsActivity"
import MainContainer from "@/components/MainContainer"
import PopularToday from "@/components/PopularToday"
import PostList from "@/components/Post/PostList"
import { Grid } from "@mui/material"

export default function HomePage() {
  return (
    <Box sx={{ display: "flex" }}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid xs={12}>
          <MainContainer
            isHeaderVisble={false}
            content={
              <Box>
                <AddPost />
                <PostList />
              </Box>
            }
            rightContent={
              <Box>
                <FriendsActivity />
                <PopularToday />
              </Box>
            }
          />
        </Grid>
      </Grid>
    </Box>
  )
}
