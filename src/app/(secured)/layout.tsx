
import React from "react";
import DrawerAppBar from "./drawer";
import { Grid } from "@mui/material";
import { getMetaData } from "@/lib/SEO";
import RightContent from "./_rightContent/page";
import { StyleRootLayout } from "@/components/StyleRootLayout";
// import { useTheme } from "@mui/material";

export default function RootLayout({ children }: any) {

  return (
    <StyleRootLayout>
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
    </StyleRootLayout>
  );
}

export const metadata = getMetaData({
  title: "Floyx | Decentralized World",
  description: "Floyx | Decentralized World"
})
