import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColor {
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;

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
