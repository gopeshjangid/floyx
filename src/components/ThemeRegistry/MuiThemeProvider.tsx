import { useTheme } from "next-themes";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import getThemeObject from "./theme";
import { globalStyles } from "./globalStyle";
import { FC, useEffect, useState } from "react";

const MUIThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(getThemeObject('dark'));

  useEffect(() => {
    const theme = getThemeObject(resolvedTheme)
    setCurrentTheme(theme)
  }, [resolvedTheme]);
console.log({currentTheme}, "resolvedTheme: ", resolvedTheme)
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline/>
      <GlobalStyles styles={globalStyles} />
      {children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;
