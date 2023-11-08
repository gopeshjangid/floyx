import { PaletteOptions, createTheme, css } from "@mui/material/styles";

export type AllowedTheme = NonNullable<PaletteOptions["mode"]>;

export const DEFAULT_THEME: AllowedTheme = "light";

export const globalStyles = css`
  :root {
    body {
      background-color: #F9FBFC;
    }
  }
  [data-theme="dark"] {
    body {
      background-color: #F9FBFC;
    }
  }
`;
