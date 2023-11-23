import React from "react";
import DrawerAppBar from "./drawer";
import { Box, Container, Grid, Toolbar } from "@mui/material";
import { getMetaData } from "@/lib/SEO";
import { ToastProvider } from "@/components/Toast/useToast";
import AuthProvider from "../context/AuthProvider";
import RightContent from "./_rightContent/page";

export default function RootLayout({ children, rightContent }: any) {
  return (
    <Box display="flex" minHeight="100vh">
      <DrawerAppBar />
      {/* TODO: container width */}
      <Box width="100%" paddingInline={2.5}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export const metadata = getMetaData({
  title: "Floyx | Decentralized World",
  description: "Floyx | Decentralized World"
})
