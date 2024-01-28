'use client';
import { Typography, styled } from '@mui/material';

export const CustomDescription = styled(Typography)(
  () => `
   overflow-wrap: break-word;
   white-space: pre-line;
`
);

export default CustomDescription;
