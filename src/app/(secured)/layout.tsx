import React from "react";
import DrawerAppBar from "./drawer";
import { Box, Grid } from "@mui/material";
import { getMetaData } from "@/lib/SEO";
import RightContent from "./_rightContent/page";
// import { useTheme } from "@mui/material";

export default function RootLayout({ children }: any) {
  // const theme = useTheme();

  return (
    <Box display="flex" minHeight="100vh">
      <DrawerAppBar />
      {/* TODO: container width */}
      <Grid
        container display={"flex"}
        flexDirection={"row"}
        sx={{
          padding: { xs: '70px 0', md: '30px 0' },
          // backgroundColor: theme.palette.mode === 'light' ? '#F9FBFF' : theme.palette.background.paper,
          width: "100%"
        }}>
        {children}
        <RightContent />
      </Grid>
    </Box>
  );
}

export const metadata = getMetaData({
  title: "Floyx | Decentralized World",
  description: "Floyx | Decentralized World"
})
