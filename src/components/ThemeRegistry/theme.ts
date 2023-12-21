'use client';
import { Poppins } from 'next/font/google';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// const gradientBorder = 'linear-gradient(86.55deg, #AB59FF 0%, #858FFF 57.35%, #4D9AFF 100.99%)';
const getThemeObject = (mode: PaletteMode): ThemeOptions => {
  // const isLightTheme = mode === 'light';
  const palette = {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#2F2E41', // Topic Text
            // You can also define light, dark and contrastText if necessary
            100: '#777D88',
            200: '#0B081F',
            300: '#85838F',
            700: '#fff',
            800: '#E7F0FC',
            900: '#fff',
            boxBorder: 'rgba(231, 240, 252, 1)',
            boxBackground: '#fff',
            iconFontColor: '#fff',
            mainBackground: '#fff',
            iconSelectedColor: "#A75FFF",
          },
          secondary: {
            main: '#ADB3C6', // Text Guide
            // You can also define light, dark and contrastText if necessary
            100: '#A85CFF',
            200: '#A561FF',
            300: 'rgba(194, 148, 255, 0.38)',
            400: '#AB59FF',
          },
          text: {
            primary: '#7C93AE', // Body Text
            secondary: '#777D88',
            // Define other text colors like 'secondary', 'disabled', etc., if necessary
          },
          background: {
            default: '#F9FBFF', // Light - Background
            paper: '#F9FBFC', // Light - Background 2
          },
          action: {
            active: '#ADB3C6', // Text Guide
            hover: '#ADB3C6', // Text Guide
            selected: '#ADB3C6', // Text Guide
            disabled: '#ADB3C6', // Text Guide
            disabledBackground: '#ADB3C6', // Text Guide
            focus: '#ADB3C6', // Text Guide
            hoverOpacity: 0.08,
            disabledOpacity: 0.48,
            border: '#EFF1F7',
            svg: ' #ADB3C6',
            error: '#FF5757',
            black: '#000',
            white: '#fff',
            opposite: '#000',
          },
          common: {
            white: '#ffffff',
            black: '#000000',
          },
        }
      : {
          primary: {
            main: '#5798FF', // Primary Blue
            // Define light, dark, and contrastText if necessary
            100: '#D1D0D5',
            200: '#0B081F',
            300: '#777D88',
            700: '#0B081F',
            800: '#0B081F',
            900: '#fff',
            boxBorder: 'rgba(255, 255, 255, 0.15)',
            boxBackground: '#0B081F',
            iconFontColor: '#0B081F',
            mainBackground: '#0B081F',
            iconSelectedColor: "#A75FFF",
          },
          secondary: {
            main: '#A75FFF', // Primary Purple
            // Define light, dark, and contrastText if necessary
            100: '#A85CFF',
            200: '#A561FF',
            300: 'rgba(194, 148, 255, 0.38)',
            400: '#AB59FF',
          },
          background: {
            default: '#1B1830', // Dark - Background
            paper: '#0B081F', // Dark - Background 2
          },
          // Define other palette properties like error, warning, info, success, etc., if necessary
          // Since you have not specified text colors for dark mode, you may want to choose colors that have enough contrast against the dark backgrounds
          text: {
            primary: '#D1D0D5', // Assuming white text for dark mode for better readability
            secondary: 'rgba(255, 255, 255, 0.7)', // Lighter text for secondary text
          },
          action: {
            active: '#ADB3C6', // Text Guide
            hover: '#ADB3C6', // Text Guide
            selected: '#ADB3C6', // Text Guide
            disabled: '#ADB3C6', // Text Guide
            disabledBackground: '#ADB3C6', // Text Guide
            focus: '#ADB3C6', // Text Guide
            hoverOpacity: 0.08,
            disabledOpacity: 0.48,
            border: '#ffffff26',
            svg: 'rgba(255, 255, 255, 0.30)',
            error: '#FF5757',
            black: '#000',
            white: '#fff',
            opposite: '#fff',
          },
          common: {
            white: '#ffffff',
            black: '#000000',
          },
        }),
  };
  return createTheme({
    palette,
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
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            color: palette.primary.main, // Use the dynamic color for links
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            // Apply bottom margin to all Typography components
            marginBottom: '0.35em', // Adjust the value to your preference
          },
          // If you want to apply it conditionally based on the `gutterBottom` prop:
          gutterBottom: {
            marginBottom: '0.35em', // Adjust the value to match the theme's spacing
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          // Assuming "primary" is your default color for the button
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
        },
      },
      // MuiTypography: {
      //   styleOverrides: {
      //     root: {
      //       // Apply bottom margin to all Typography components
      //       marginBottom: '0.35em', // Adjust the value to your preference
      //     },
      //     // If you want to apply it conditionally based on the `gutterBottom` prop:
      //     gutterBottom: {
      //       marginBottom: '0.35em', // Adjust the value to match the theme's spacing
      //     },
      //   },
      // },
      // MuiLink: {
      //   styleOverrides: {
      //     root: {
      //       color: palette?.primary?.main, // Use the dynamic color for links
      //       textDecoration: 'none',
      //       '&:hover': {
      //         textDecoration: 'underline',
      //       },
      //     },
      //   },
      // },
      MuiCssBaseline: {
        styleOverrides: `
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
          &::-webkit-scrollbar {
            display: none;
          }
        }
      `,
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            '& .MuiTabs-flexContainer': {
              gap: '24px',
            },
            '& .MuiTabs-indicator': {
              background: `linear-gradient(87deg, ${palette.secondary[400]} 0%, #858FFF 57.35%, #4D9AFF 100.99%)`,
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
            fontWeight: '400',
            color:
              palette?.mode === 'light'
                ? palette.text.primary
                : palette?.action?.svg,
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
            color: palette?.primary?.[100],
            fontSize: '16px',
            fontWeight: '400',
            textAlign: 'left',
          },
          asterisk: {
            color: palette?.action?.error,
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            borderRadius: '10px !important',
            background: palette?.background?.paper,
            border: `1px solid ${palette?.primary?.[800]}`,
            overflow: 'hidden',
            '&.MuiInputBase-adornedStart': { paddingLeft: '20px !important' },
            '&.MuiInputBase-adornedEnd': { paddingRight: '20px !important' },
            '& .MuiInputBase-input': {
              padding: '13px 25px 13px 10px',
              height: 'fit-content',
              WebkitTextFillColor: palette?.action?.svg,
              borderRadius: '0',
              '&::placeholder': { opacity: '1' },
            },
            '& .MuiInputAdornment-root': {
              margin: '0',
              '& .MuiIconButton-edgeEnd': {
                margin: '0',
                color: palette?.action?.svg,
              },
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            '&:-webkit-autofill': {
              '-webkit-box-shadow': `0 0 0 100px ${palette.background.paper} inset`,
              WebkitTextFillColor: mode === 'light' ? '#ADB3C6' : '#D1D0D5',
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
              color: mode === 'light' ? palette.primary[100] : '#D1D0D5',
              fontSize: '16px',
              fontWeight: '400',
            },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            border: `2px solid ${palette.secondary[200]}`,
            background: palette.secondary[300],
          },
        },
      },
      // MuiButton: {
      //   styleOverrides: {
      //     // Assuming "primary" is your default color for the button
      //     root: {
      //       height: 'fit-content !important',
      //       textTransform: 'capitalize',
      //     },
      //     containedPrimary: {
      //       color: 'white', // Assuming you want white text for the button
      //       borderRadius: '10px',
      //       padding: '12px 29px',
      //       gap: '10px',
      //       background: `linear-gradient(90deg, ${palette.secondary[400]}  0%, #858FFF 50%, #4D9AFF 100%)`,
      //       '&:hover': {
      //         // You should also define the hover state
      //         background: `linear-gradient(90deg, ${palette.secondary[400]}  0%, #858FFF 50%, #4D9AFF 100%)`,
      //         opacity: 0.9, // Or any other styling you want on hover
      //       },
      //     },
      //     outlined: {},
      //   },
      // },
    },
  });
};

export default getThemeObject;
