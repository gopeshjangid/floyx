'use client';
import { Roboto, Poppins } from 'next/font/google';
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
    breakpoints: {
      values: {
        xs: 300, // phone
        sm: 680, // tablets
        md: 900, // small laptop
        lg: 1200, // desktop
        xl: 1536, // large screens
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            padding: 0,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            '&.MuiButton-containedPrimary': {
              borderRadius: '10px',
              background: 'var(--gradient-color)',
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
