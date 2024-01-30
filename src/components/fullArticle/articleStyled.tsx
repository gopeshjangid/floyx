'use client';
import { Typography, styled } from '@mui/material';

export const ArticleTypographyHeading = styled(Typography)(({ theme }) => ({
  color:
    theme.palette.mode === 'light'
      ? theme.palette.common.black
      : theme.palette.common.white,
  textTransform: 'capitalize',
  wordBreak: 'break-all',
  whiteSpace: 'pre-line',
}));

export const ArticleUserName = styled(Typography)(({ theme }) => ({
  color:
    theme.palette.mode === 'light'
      ? theme.palette.common.black
      : theme.palette.common.white,
}));

export const ArticleDescription = styled(Typography)(({ theme }) => ({
  '& *': {
    color: `${
      theme.palette.mode === 'light'
        ? theme.palette.common.black
        : theme.palette.common.white
    } !important`,
  },
}));
