import * as React from "react";
import Box from "@mui/material/Box";
import AddPost from '@/components/Post/AddPost';
import FriendsActivity from '@/components/FriendsActivity';
import MainContainer from '@/components/MainContainer';
import PopularToday from "@/components/PopularToday";
import PostList from "@/components/Post/PostList";

export default function HomePage() {
  return (
    <MainContainer
      isHeaderVisble={true}
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
  );
}
