import React from 'react';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// Styled component for the gradient text
const GradientText = styled('span')({
  background: 'linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'white', // This ensures the text has color if the gradient is not supported
});

// Styled component for the fully rounded Chip with a semi-transparent gradient background
const GradientChip = styled(Chip)(() => ({
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

export const AnimatedBorderButton = styled(Button)(({ theme }) => {
  // Define the keyframe animation
  const borderAnimation = `
    @keyframes borderAnimation {
      0% { border-color: transparent; }
      50% { border-color: ${theme.palette.secondary.main}; }
      100% { border-color: transparent; }
    }
  `;

  return {
    // Inject the keyframe animation into the component
    '@global': {
      '.animated-border-button': borderAnimation,
    },
    // Apply the animation to the button
    animation: 'borderAnimation 2s linear infinite',
    border: '2px solid transparent',

    // Additional styling for the button
    padding: theme.spacing(1, 3),
    margin: theme.spacing(1),
  };
});

export default CustomChip;
