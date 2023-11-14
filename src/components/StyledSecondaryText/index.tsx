import { styled } from "@mui/material/styles"
import { Typography } from "@mui/material"

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  display: 'block',
  width: 'max-content'
}));
