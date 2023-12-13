import React from 'react';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

// Styled component for the gradient text
const GradientText = styled('span')({
  background: 'linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'white', // This ensures the text has color if the gradient is not supported
});

// Styled component for the fully rounded Chip with a semi-transparent gradient background
const GradientChip = styled(Chip)(({ theme }) => ({
  borderRadius: '33px', // Fully rounded ends
  background:
    'linear-gradient(to right, rgba(171, 89, 255, 0.1), rgba(133, 143, 255, 0.1), rgba(77, 154, 255, 0.1))', // Semi-transparent gradient background
  color: 'transparent', // Make text transparent so the gradient shows through
  '&:hover, &:focus': {
    background:
      'linear-gradient(to right, rgba(171, 89, 255, .4), rgba(133, 143, 255, 0.4), rgba(77, 154, 255, 0.4))', // Semi-transparent gradient background
  },
  boxShadow: 'none', // Subtle shadow for depth
  border: 'none',
}));

// Reusable chip component
const CustomChip = ({ label, ...props }) => {
  return (
    <GradientChip
      label={<GradientText>{label}</GradientText>}
      variant="outlined"
      {...props}
    />
  );
};

export default CustomChip;
