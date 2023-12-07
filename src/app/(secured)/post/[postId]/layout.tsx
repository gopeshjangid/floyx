import React from "react";
import { Grid } from "@mui/material";
import { getMetaData } from "@/lib/SEO";

export default function RootLayout({ children, rightContent }: any) {
  return (
    <Grid container spacing={2} display={"flex"} flexDirection={"row"} sx={{margin: { xs: '70px 0', md: '0 0' }, width: "100%"}}>
      {children}
      {rightContent}
    </Grid>
  )
}

export const metadata = getMetaData({
  title: "Floyx | Decentralized World",
  description: "Floyx | Decentralized World"
})