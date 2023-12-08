import { styled, TextField } from '@mui/material';

const CustomTextField = styled(TextField)(
  ({ theme }) => `
  width: 100%;
  &:hover {
    border-color: ${theme.palette.primary.main};
  }

  &:focus {
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === 'dark'
        ? theme.palette.primary.light
        : theme.palette.primary.dark
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

export default CustomTextField;
