import { useTheme } from 'next-themes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import getThemeObject from './theme';
import { FC, useEffect, useState } from 'react';

const MUIThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider
      theme={getThemeObject(resolvedTheme === 'dark' ? 'dark' : 'light')}
    >
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;
