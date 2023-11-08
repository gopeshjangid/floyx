'use client';
import { Poppins } from 'next/font/google';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const gradientBorder = ({ color1, color2, color3, width }) => {
  return `linear-gradient(90deg, ${color1} 0%, ${color2} 50%, ${color3} 100%) 1 round ${width}`;
};

const getThemeObject = (mode: PaletteMode): ThemeOptions => {
  const isLightTheme = mode === 'light';
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#2F2E41', // Topic Text
              // You can also define light, dark and contrastText if necessary
              100: '#777D88',
              200: '#777D88',
            },
            secondary: {
              main: '#ADB3C6', // Text Guide
              // You can also define light, dark and contrastText if necessary
            },
            text: {
              primary: '#2F2E41', // Body Text
              // Define other text colors like 'secondary', 'disabled', etc., if necessary
            },
            background: {
              default: '#F9FBFC', // Light - Background
              paper: '#F9FBFF', // Light - Background 2
            },
          }
        : {
            primary: {
              main: '#5798FF', // Primary Blue
              // Define light, dark, and contrastText if necessary
              100: '#D1D0D5',
              200: '#CECED2',
            },
            secondary: {
              main: '#A75FFF', // Primary Purple
              // Define light, dark, and contrastText if necessary
            },
            background: {
              default: '#0B081F', // Dark - Background
              paper: '#1B1830', // Dark - Background 2
            },
            // Define other palette properties like error, warning, info, success, etc., if necessary
            // Since you have not specified text colors for dark mode, you may want to choose colors that have enough contrast against the dark backgrounds
            text: {
              primary: '#ffffff', // Assuming white text for dark mode for better readability
              secondary: 'rgba(255, 255, 255, 0.7)', // Lighter text for secondary text
            },
          }),
    },
    typography: {
      fontFamily: [
        poppins.style.fontFamily, // You can put your desired font here
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: {
        fontWeight: 600, // SemiBold
        fontSize: '2.375rem', // 38px
        lineHeight: 1.3,
        letterSpacing: '0%',
      },
      h2: {
        fontWeight: 600, // SemiBold
        fontSize: '1.25rem', // 20px
        lineHeight: 1.2,
        letterSpacing: '0%',
      },
      h3: {
        fontWeight: 600, // SemiBold
        fontSize: '1.5rem', // 24px
        lineHeight: 1.5,
        letterSpacing: '0%',
      },
      h4: {
        fontWeight: 500, // Medium
        fontSize: '1.375rem', // 22px
        lineHeight: 1.5,
        letterSpacing: '0%',
      },
      h5: {
        fontWeight: 500, // Medium
        fontSize: '1.125rem', // 18px
        lineHeight: 1.5,
        letterSpacing: '0%',
      },
      h6: {
        fontWeight: 400, // Regular
        fontSize: '1rem', // 16px
        lineHeight: 1.5,
        letterSpacing: '0%',
      },
      subtitle1: {
        fontWeight: 400, // Regular
        fontSize: '1rem', // 16px
        lineHeight: 1.5,
        letterSpacing: '0%',
      },
      subtitle2: {
        fontWeight: 500, // Medium
        fontSize: '0.875rem', // 14px
        lineHeight: 1.57,
        letterSpacing: '0%',
      },
      body1: {
        fontWeight: 400, // Regular
        fontSize: '1rem', // 16px
        lineHeight: 1.5,
        letterSpacing: '0%',
      },
      body2: {
        fontWeight: 400, // Regular
        fontSize: '0.875rem', // 14px
        lineHeight: 1.57,
        letterSpacing: '0%',
      },
      button: {
        fontWeight: 500, // Medium
        fontSize: '0.875rem', // 14px
        lineHeight: 1.75,
        letterSpacing: '0.02857em',
        textTransform: 'uppercase',
      },
      caption: {
        fontWeight: 400, // Regular
        fontSize: '0.75rem', // 12px
        lineHeight: 1.66,
        letterSpacing: '0%',
      },
      overline: {
        fontWeight: 400, // Regular
        fontSize: '0.75rem', // 12px
        lineHeight: 2.66,
        letterSpacing: '0.08333em',
        textTransform: 'uppercase',
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
      // MuiButton: {
      //   styleOverrides: {
      //     root: {
      //       textTransform: 'capitalize',
      //       '&.MuiButton-containedPrimary': {
      //         borderRadius: '10px',
      //         background: 'var(--gradient-color)',
      //         ...(isLightTheme
      //           ? {
      //               color: '#fff',
      //             }
      //           : {}),
      //       },
      //       '&.MuiButton-containedSecondary': {
      //         ...(isLightTheme
      //           ? {
      //               color: '#fff',
      //             }
      //           : {}),
      //       },
      //     },
      //   },
      // },
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
            color: isLightTheme ? '#777D88' : '#D1D0D5',
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
            ...(isLightTheme
              ? { background: '#F9FBFC', border: '1px solid #EFF1F7' }
              : { background: '#1B1830', border: '1px solid #1B1830' }),
            overflow: 'hidden',
            '&.MuiInputBase-adornedStart': { paddingLeft: '20px !important' },
            '&.MuiInputBase-adornedEnd': { paddingRight: '20px !important' },
            '& .MuiInputBase-input': {
              padding: '13px 25px 13px 10px',
              height: 'fit-content',
              WebkitTextFillColor: isLightTheme
                ? '#ADB3C6'
                : 'rgba(255, 255, 255, 0.30)',
              borderRadius: '0',
              '&::placeholder': { opacity: '1' },
            },
            '& .MuiInputAdornment-root': {
              margin: '0',
              '& .MuiIconButton-edgeEnd': {
                margin: '0',
                color: isLightTheme ? '#ADB3C6' : 'rgba(255, 255, 255, 0.30)',
              },
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            '&:-webkit-autofill': {
              '-webkit-box-shadow': `0 0 0 100px ${
                isLightTheme ? '#F9FBFC' : '#1B1830'
              } inset`,
              WebkitTextFillColor: isLightTheme ? '#ADB3C6' : '#D1D0D5',
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
              color: isLightTheme ? '#777D88' : '#D1D0D5',
              fontSize: '16px',
              fontWeight: '400',
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: isLightTheme ? '#ADB3C6' : '#1B1830',
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
      MuiButton: {
        styleOverrides: {
          // Assuming "primary" is your default color for the button
          root: {
            height: 'fit-content !important',
            textTransform: 'capitalize',
          },
          containedPrimary: {
            color: 'white', // Assuming you want white text for the button
            borderRadius: '10px',
            padding: '12px 29px',
            gap: '10px',
            background:
              'linear-gradient(90deg, #AB59FF 0%, #858FFF 50%, #4D9AFF 100%)',
            '&:hover': {
              // You should also define the hover state
              background:
                'linear-gradient(90deg, #AB59FF 0%, #858FFF 50%, #4D9AFF 100%)',
              opacity: 0.9, // Or any other styling you want on hover
            },
          },
          outlined: {
            height: '46px', // Hug (46px)
            minWidth: '161px', // Hug (161px)
            borderRadius: '4px', // Radius
            border: '1px solid transparent', // Border with gradient
            padding: '11px 26px', // Padding
            gap: '10px', // Gap
            position: 'relative', // To position the pseudo-elements for gradient
            // Create pseudo-elements for gradient border
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              borderRadius: 'inherit',
              backgroundImage: gradientBorder({
                color1: '#AB59FF',
                color2: '#858FFF',
                color3: '#4D9AFF',
                width: '1px',
              }),
              zIndex: 0,
              pointerEvents: 'none', // Ignore pointer events on the pseudo-element
            },
            // Adjust the label (child of button) to bring it above the pseudo-element
            '& .MuiButton-label': {
              position: 'relative',
              zIndex: 1,
            },
          },
        },
      },
    },
  });
};

export default getThemeObject;
