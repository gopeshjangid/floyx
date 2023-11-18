import React from "react";
import DrawerAppBar from "./drawer";
import { Container, Grid } from "@mui/material";
import { getMetaData } from "@/lib/SEO";
import { ToastProvider } from "@/components/Toast/useToast";
import AuthProvider from "../context/AuthProvider";

export default function RootLayout({ children, content, rightContent }: any) {
  return (
    <DrawerAppBar>
      <Container maxWidth={false} fixed sx={{ padding: 0 }}>
        <ToastProvider>
          <AuthProvider>
            <Grid container spacing={2} display={"flex"} flexDirection={"row"} sx={{margin: { xs: '70px 0', md: '30px 0' }, width: "100%"}}>
              {content}
              {rightContent}
              {children}
            </Grid>
          </AuthProvider>
        </ToastProvider>
      </Container>
    </DrawerAppBar>
  )
}

export const metadata = getMetaData({
  title: "Floyx | Decentralized World",
  description: "Floyx | Decentralized World"
})
