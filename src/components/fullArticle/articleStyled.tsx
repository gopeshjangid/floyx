'use client';
import { Typography, styled } from '@mui/material';

export const ArticleTypographyHeading = styled(Typography)(({ theme }) => ({
  color:theme.palette.primary.titleColor,
  textTransform: 'capitalize',
  wordBreak: 'break-all',
  whiteSpace: 'pre-line',
}));

export const ArticleUserName = styled(Typography)(({ theme }) => ({
  color:theme.palette.primary.titleColor,
}));

export const ArticleDescription = styled(Typography)(({ theme }) => ({
    color: `${theme.palette.primary.titleColor
    } !important`,
}));
