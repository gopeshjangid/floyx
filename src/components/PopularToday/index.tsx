"use client"
import { Box, Typography, Container, Divider } from "@mui/material"

import { styled } from "@mui/material/styles"
import { useEffect, useState } from "react"

const PopularTodaySection = styled(Box)(({ theme }) => ({
  marginLeft: "10px",
  alignItems: "center",
  marginTop: "20px"
}))

const PopularTodayListSection = styled(Container)(({ theme }) => ({
  border: "1px solid ",
  borderRadius: "10px",
  marginTop: "5px",
  padding: "20px",
  maxHeight: "200px",
  overflowY: "scroll"
}))

const POPULAR_POSTS = [
  {
    postName: "AirDrops 2023",
    postNumbers: 872981
  },
  {
    postName: "Cars",
    postNumbers: 87828931
  },
  {
    postName: "Anime",
    postNumbers: 9298112
  },
  {
    postName: "Bikes",
    postNumbers: 872361891
  },
  {
    postName: "Dancers",
    postNumbers: 872361891
  },
  {
    postName: "Airplanes",
    postNumbers: 872361891
  },
  {
    postName: "Random",
    postNumbers: 872361891
  }
];

interface PostObject {
   postName: string; // I assume ID is defined elsewhere
  postNumbers: number;
}

export default function PopularToday({ }) {
  const [popularPosts, setPopularPosts] = useState<PostObject[] | null>(null);

  useEffect(() => {
    setPopularPosts(POPULAR_POSTS);
  }, [])

  return (
    <PopularTodaySection>
      <Typography variant="body1">Your friend’s activities</Typography>
      <PopularTodayListSection>
        {popularPosts && popularPosts.map((val, index) =>
          <Box sx={{ margin: "5px" }}>
            <Typography variant="h5">
              {index + 1}. {val.postName}
            </Typography>
            <Typography variant="body2" sx={{ marginLeft: "15px" }}>
              {val.postNumbers} Posts
            </Typography>
            <Divider />
          </Box>
        )}
      </PopularTodayListSection>
    </PopularTodaySection>
  )
}
