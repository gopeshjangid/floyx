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
            },
            secondary: {
              main: '#ADB3C6', // Text Guide
              // You can also define light, dark and contrastText if necessary
            },
            text: {
              primary: '#7C93AE', // Body Text
              secondary: '#777D88'
              // Define other text colors like 'secondary', 'disabled', etc., if necessary
            },
            background: {
              default: '#F9FBFF', // Light - Background
              paper: '#F9FBFC', // Light - Background 2
            },
          }
        : {
            primary: {
              main: '#5798FF', // Primary Blue
              // Define light, dark, and contrastText if necessary
            },
            secondary: {
              main: '#A75FFF', // Primary Purple
              // Define light, dark, and contrastText if necessary
            },
            background: {
              default: '#1B1830', // Dark - Background
              paper: '#0B081F', // Dark - Background 2
            },
            // Define other palette properties like error, warning, info, success, etc., if necessary
            // Since you have not specified text colors for dark mode, you may want to choose colors that have enough contrast against the dark backgrounds
            text: {
              primary: '#ffffff', // Assuming white text for dark mode for better readability
              secondary: 'rgba(255, 255, 255, 0.7)', // Lighter text for secondary text
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
      }},
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
          background: 'linear-gradient(90deg, #AB59FF 0%, #858FFF 50%, #4D9AFF 100%)',
          '&:hover': {
            // You should also define the hover state
            background: 'linear-gradient(90deg, #AB59FF 0%, #858FFF 50%, #4D9AFF 100%)',
            opacity: 0.9 // Or any other styling you want on hover
          }
        },
      //  outlined: {
      //   // width: '133px',
      //     height: '40px',
      //     padding: '11px 26px',
      //     borderRadius: '4px',
      //     gap: '10px',
      //     fontWeight: 500,
      //     fontSize: '16px',
      //     lineHeight: '24px',
      //     position: 'relative',
      //     border: '1px solid transparent',
      //       overflow: 'hidden', 
      //      background: gradientBorder,
      //       WebkitBackgroundClip: 'text',
      //     WebkitTextFillColor: 'transparent',
      //     MozBackgroundClip: 'text',
      //     MozTextFillColor: 'transparent',
      //     // The gradient text should be visible by default:
      //     // color: 'transparent',// Fallback color
      //     '& .MuiButton-label': {
      //       background: 'linear-gradient(86.55deg, #AB59FF 0%, #858FFF 57.35%, #4D9AFF 100.99%)',
      //       WebkitBackgroundClip: 'text',
      //       WebkitTextFillColor: 'transparent',
      //       MozBackgroundClip: 'text',
      //       MozTextFillColor: 'transparent',
      //     },
      //     // The gradient border should also be visible by default:
      //     '&:before': {
      //       content: '""',
      //       position: 'absolute',
      //       top: 0,
      //       right: 0,
      //       bottom: 0,
      //       left: 0,
      //       borderRadius: '4px',
      //       border: '1px solid',
      //       borderImageSlice: 1,
      //       borderImageSource: 'linear-gradient(86.55deg, #AB59FF 0%, #858FFF 57.35%, #4D9AFF 100.99%)',
      //       zIndex: -1,
      //     },
      //     // Hover state: you might want to change the opacity or add other styles:
      //     '&:hover': {
      //       '&:before': {
      //          borderRadius: 'inherit',
      //         opacity: 0.8, // Example: slightly reduce the opacity on hover
      //       },
      //     },
      //     // Active state: you might want to change the opacity or add other styles:
      //     '&:active': {
      //       '&:before': {
      //         opacity: 0.9, // Example: slightly increase the opacity to indicate active state
      //       },
      //     },
      //     // Disabled state:
      //     '&:disabled': {
      //       color: '#aaa', // Dim the text color
      //       backgroundColor: '#f3f3f3', // Set a different background
      //       '& .MuiButton-label': {
      //         background: 'none', // Remove gradient background on disabled state
      //       },
      //       '&:before': {
      //         display: 'none', // Hide the gradient border on disabled state
      //       },
      //     },
      //     // Focus state: ensure the gradient border and text are fully visible:
      //     '&:focus': {
      //       '& .MuiButton-label': {
      //         background: 'linear-gradient(86.55deg, #AB59FF 0%, #858FFF 57.35%, #4D9AFF 100.99%)',
      //         WebkitBackgroundClip: 'text',
      //         WebkitTextFillColor: 'transparent',
      //         MozBackgroundClip: 'text',
      //         MozTextFillColor: 'transparent',
      //       },
      //       '&:before': {
      //         opacity: 1, // Ensure the gradient border is fully visible
      //       },
      //     },
      //  }
        outlined: {},
      }
    }
    },
  });
};

export default getThemeObject;
