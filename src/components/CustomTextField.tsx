import { styled, TextField } from '@mui/material';

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    background: theme.palette.primary[400],
    borderRadius: '10px',
    '&:focus': {
      border: `1px solid ${theme.palette.primary.boxBorder}`,
    },
  },
}));

export default CustomTextField;
