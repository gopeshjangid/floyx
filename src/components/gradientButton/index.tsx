import { Padding } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

type GradientProps = {
  isSelected?: boolean;
  isBorderRadius?: boolean;
};
const options = {
  shouldForwardProp: (prop) => prop !== "isSelected",
};

export const GradientButton = styled(
  Button,
  options
)<GradientProps>(({ theme, isSelected, isBorderRadius }) => ({
  position: 'relative',
  border: '0px',
  padding: '8px',
  '& svg': {
    stroke: 'none',
  },
  '& :before': {
    content: "''",
    position: 'absolute',
    inset: '0',
    borderRadius: isBorderRadius ? '10px': '5px',
    padding: '1px',
    background: isSelected ? 'linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF)': '',
    '-webkit-mask': 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    // '-webkit-mask-composite': 'xor',
    'mask-composite': 'exclude',
    border: isSelected ? "0px" : `1px solid ${theme.palette.primary.boxBorder}`,
  },
  "& span": {
    color: isSelected ? theme.palette.text.primary: theme.palette.primary.fontLightColor,
    background: isSelected ? 'linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF)' : '',
    WebkitBackgroundClip: 'text',
    padding: '3px',
    WebkitTextFillColor: isSelected ? 'transparent' : theme.palette.text.primary,
    "& svg:hover": {
      fill: "yellow",
    }
  },
  ":disabled": {
    background: theme.palette.primary[700],
    border: "0px",
    borderRadius: '10px',
    // borderImageSlice: 1,
    // borderImageSource: `linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF)`,
  },
  "&:hover": {
    background: theme.palette.primary[700],
    border: "0px",
    borderRadius: '10px',
    // "& span": {
    //   color: theme.palette.text.primary,
    //   background: 'linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF)',
    //   WebkitBackgroundClip: 'text',
    //   WebkitTextFillColor: 'transparent',
    // }
  }
  // marginRight: 1,
  // padding: '5px 10px',
  // whiteSpace: 'nowrap',
  // alignItems: 'center',
  // borderRadius: '8px',
  // color: theme.palette.text.primary,
  // borderColor: theme.palette.primary.boxBorder,
  // background: theme.palette.primary[700],
  // fontWeight: 500,
  // borderEadius: '5px',
  // border: isSelected ? "1px solid" : "",
  // borderImageSlice: isSelected ? 1: 0,
  // borderImageSource: isSelected ? `linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF)`: "",
  // "&:hover": {
  //   background: theme.palette.primary[700],
  //   border: "1px solid",
  //   borderImageSlice: 1,
  //   borderImageSource: `linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF)`,
  //   "& span": {
  //     color: theme.palette.text.primary,
  //     background: 'linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF)',
  //     WebkitBackgroundClip: 'text',
  //     WebkitTextFillColor: 'transparent',
  //   }
  // },
  // "& span": {
  //   color: isSelected ? theme.palette.text.primary: "white",
  //   background: isSelected ? 'linear-gradient(45deg, #AB59FF, #858FFF, #4D9AFF)': theme.palette.primary[700],
  //   WebkitBackgroundClip: 'text',
  //   borderRadius: '10px',
  //   WebkitTextFillColor: isSelected ? 'transparent': theme.palette.text.primary ,
  // },
  // ":disabled": {
  //   background: theme.palette.primary[700],
  //   border: "1px solid",
  //   borderImageSlice: 1,
  //   borderImageSource: `linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF)`,
  // }
}));
