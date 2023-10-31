'use client';
import { Roboto } from 'next/font/google';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const getThemeObject = (theme: PaletteMode): ThemeOptions => {
  const isLightTheme = theme === 'light';
  return createTheme({
    palette: {
      mode: theme,
      primary: {
        main: '#fff',
      },
      secondary: {
        main: '#5798FF',
      },
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
      h1: {
        fontSize: 28,
        fontWeight: 300,
      },
      h2: {
        fontSize: 26,
        fontWeight: 300,
      },
      h3: {
        fontSize: 24,
        fontWeight: 400,
      },
      h4: {
        fontSize: 22,
        fontWeight: 400,
      },
      h5: {
        fontSize: 20,
        fontWeight: 400,
      },
      h6: {
        fontSize: 16,
        fontWeight: 500,
      },
      subtitle1: {
        fontSize: 26,
        fontWeight: 600,
      },
      subtitle2: {
        fontSize: 16,
        fontWeight: 500,
      },
      body1: {
        fontSize: 15,
        fontWeight: 400,
      },
      body2: {
        fontSize: 14,
        fontWeight: 400,
      },
      button: {
        fontSize: 14,
        fontWeight: 500,
      },
      caption: {
        fontSize: 14,
        fontWeight: 400,
      },
      overline: {
        fontSize: 13,
        fontWeight: 400,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            '&.MuiButton-containedPrimary': {
              background: 'var(--gradient-color) !important',
              ...(isLightTheme
                ? {
                    color: '#fff',
                  }
                : {}),
            },
            '&.MuiButton-containedSecondary': {
              ...(isLightTheme
                ? {
                    color: '#fff',
                  }
                : {}),
            },
          },
        },
      },
    },
  });
};

export default getThemeObject;
