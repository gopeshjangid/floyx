'use client';
import Link from 'next/link';
import { styled } from '@mui/material';

export const StyledNextLink = styled(Link)(
  () => `
  font-weight: 500;
  color: #5798FF,
   &:hover {
    text-decoration: underline !important;
  }
`
);

export default StyledNextLink;
