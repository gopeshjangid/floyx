'use client';
import { Typography, styled } from '@mui/material';

export const CustomDescription = styled(Typography)(
  () => `
   word-break: break-all;
   white-space: pre-line;
`
);

export default CustomDescription;
