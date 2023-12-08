import { useTheme } from 'next-themes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import getThemeObject from './theme';
import { FC, useEffect, useState } from 'react';

const MUIThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(getThemeObject('dark'));

  useEffect(() => {
    if (!resolvedTheme) return;
    const theme = getThemeObject(resolvedTheme === 'dark' ? 'dark' : 'light');
    setCurrentTheme(theme);
  }, [resolvedTheme]);
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;
