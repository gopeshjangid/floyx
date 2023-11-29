import React from "react";
import DrawerAppBar from "./drawer";
import { Box, Container, Grid, Toolbar } from "@mui/material";
import { getMetaData } from "@/lib/SEO";
import { ToastProvider } from "@/components/Toast/useToast";
import AuthProvider from "../context/AuthProvider";
import RightContent from "./_rightContent/page";

export default function RootLayout({ children }: any) {
  return (
    <Box display="flex" minHeight="100vh">
      <DrawerAppBar />
      {/* TODO: container width */}
      <Grid container display={"flex"} flexDirection={"row"} sx={{ margin: { xs: '70px 0', md: '30px 0' }, width: "100%"}}>
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
