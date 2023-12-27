'use client';

import { Box, Theme, styled } from '@mui/material';

export const AuthWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  background: theme.palette?.mode === 'light' ? '#fff' : theme.palette.background.default,
  '& .outline-btn': {
    border: `1.5px solid ${theme.palette?.mode === 'light' ? '#E3E7F4' : 'rgba(255, 255, 255, 0.15)'}`,
    color: theme.palette.primary[100],
    fontSize: '16px',
    textTransform: 'initial',
    fontWeight: '400',
    padding: '14px',
    width: '100%',
    borderRadius: '10px',
  },
  '& .social-login': {
    color: '#A85CFF',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  '&. submit-btn': {
    textTransform: 'capitalize',
    padding: '12px 29px',
    color: theme.palette.background.default,
    fontSize: '16px',
    fontWeight: '400',
  },
}));
