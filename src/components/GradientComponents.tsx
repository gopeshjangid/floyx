import { styled, Button } from '@mui/material';
import React from 'react';

export const GradientText = styled('span')(({ ...props }) => ({
  background: 'linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'normal',
  color: 'white', // This ensures the text has color if the gradient is not supported
  ...props,
}));

export const GradientOutlinedButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  backgroundColor: 'transparent',
  color: 'transparent',
  fontWeight: 'bold',
  transition: 'all 0.3s',

  // Gradient text
  background: 'linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',

  // Gradient border
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
    margin: '-1px', // Adjust the size of the border here
    borderRadius: 'inherit', // Inherit the borderRadius from Button
    background: 'linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF)',
  },

  // Remove the button's default border

  // Hover and focus states
  '&:hover, &:focus': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    // Optional: Change the gradient colors on hover if you want
    '&:before': {
      background: 'linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF)',
    },
  },
}));
