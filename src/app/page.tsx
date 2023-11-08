import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import MediaCard from "@/components/MediaCard";
import { Button } from "@mui/material";
import AddPost from '@/components/Post/AddPost';
import FriendsActivity from '@/components/FriendsActivity';
import MainContainer from '@/components/MainContainer';
import PopularToday from "@/components/PopularToday";

export default function HomePage() {
  return (
    <MainContainer
      isHeaderVisble={true}
      content={
        <Box>
          <AddPost />
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
