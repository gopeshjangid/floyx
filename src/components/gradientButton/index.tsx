import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

type GradientProps = {
  isSelected?: boolean;
};
const options = {
  shouldForwardProp: (prop) => prop !== "isSelected",
};

export const GradientButton = styled(
  Button,
  options
)<GradientProps>(({ theme, isSelected }) => ({
  marginRight: 1,
  padding: '5px 10px',
  whiteSpace: 'nowrap',
  alignItems: 'center',
  color: theme.palette.text.primary,
  borderColor: theme.palette.primary.boxBorder,
  background: theme.palette.primary[700],
  fontWeight: 500,
  fontSize: '15px',
  border: isSelected ? "1px solid" : "",
  borderImageSlice: isSelected ? 1: 0,
  borderImageSource: isSelected ? `linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF)`: "",
  "&:hover": {
    background: theme.palette.primary[700],
    border: "1px solid",
    borderImageSlice: 1,
    borderImageSource: `linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF)`,
    "& span": {
      color: theme.palette.text.primary,
      background: 'linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }
  },
  "& span": {
    color: isSelected ? theme.palette.text.primary: "white",
    background: isSelected ? 'linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF)': theme.palette.primary[700],
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: isSelected ? 'transparent': theme.palette.text.primary ,
  }
}));
