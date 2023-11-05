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
            textTransform: 'capitalize',
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
            '&.MuiButton-text': {
              padding: '0',
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            '& .MuiTabs-flexContainer': {
              gap: '24px',
            },
            '& .MuiTabs-indicator': {
              background:
                'linear-gradient(87deg, #AB59FF 0%, #858FFF 57.35%, #4D9AFF 100.99%)',
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            padding: '0',
            minWidth: 'fit-content',
            textTransform: 'capitalize',
            fontSize: '16px',
            fontFamily: 'Poppins',
            fontWeight: '400',
            color: 'rgba(255, 255, 255, 0.30)',
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            marginBottom: '10px',
            width: '100%',

            '& .MuiIconButton-root': {
              padding: '0',
            },
            '& fieldset': { display: 'none' },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            marginBottom: '12px',
            color: '#D1D0D5',
            fontSize: '16px',
            fontWeight: '400',
            textAlign: 'left',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            borderRadius: '10px !important',
            background: '#1B1830',
            overflow: 'hidden',
            '&.MuiInputBase-adornedStart': { paddingLeft: '20px !important' },
            '&.MuiInputBase-adornedEnd': { paddingRight: '20px !important' },
            '& .MuiInputBase-input': {
              padding: '13px 25px 13px 10px',
              height: 'fit-content',
              color: '#D1D0D5',
              borderRadius: '0',
            },
            '& .MuiInputAdornment-root': {
              margin: '0',
              '& .MuiIconButton-edgeEnd': { margin: '0' },
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            '&:-webkit-autofill': {
              '-webkit-box-shadow': '0 0 0 100px #1B1830 inset',
              '-webkit-text-fill-color': '#D1D0D5',
              borderRadius: '0',
            },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            margin: '0',
            '& .MuiTypography-root': {
              color: '#D1D0D5',
              fontSize: '16px',
              fontWeight: '400',
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: 'rgba(255, 255, 255, 0.15)',
            '&.Mui-checked': {
              color: '#A85CFF',
            },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            border: '1px solid  #A561FF',
            background: 'rgba(194, 148, 255, 0.38)',
          },
        },
      },
    },
  });
};

export default getThemeObject;
