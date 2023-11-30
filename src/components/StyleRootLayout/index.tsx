"use client";

import { styled } from "@mui/material/styles"
import { Box } from "@mui/material"

export const StyleRootLayout = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  display: "flex",
  minHeight: '100vh',
}));
