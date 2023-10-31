"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import { PaletteMode } from "@mui/material";

import getTheme from "./theme";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const themes = ["dark", "light"];
  const [selectedMode, setSelectedMode] = useState<PaletteMode>("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as PaletteMode;

    const selectedMode: PaletteMode = themes.includes(storedTheme)
      ? storedTheme
      : "light";

    setSelectedMode(selectedMode);
  }, []);

  const theme = getTheme(selectedMode);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
