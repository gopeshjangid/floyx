import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColor {
    100?: string;
    200?: string;
    // Add other custom properties as needed
  }

  // Optionally, if you have custom properties outside of the PaletteColor
  interface ThemeOptions {
    // Define any additional theme options here
  }

  interface Theme {
    // Corresponding non-optional properties for the Theme
  }
}
