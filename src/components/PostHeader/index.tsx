'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Grid, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ArticleProfileIcon from '@/assets/images/svg/articleIcon';
const HeaderSection = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 1,
  width: '100%',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '10px',
  },
  scrollbarColor: 'rgba(0, 0, 0, 0.4) rgba(0, 0, 0, 0.1)',
}));
export default function Header() {
  const pathName = usePathname();

  const { palette } = useTheme();
  const getColorSvg = path => {
    if (pathName === path) {
      return palette.primary.iconSelectedColor;
    }
    return palette?.mode === 'light'
      ? palette.text.primary
      : palette?.primary.fontLightColor;
  };

  return (
    <HeaderSection pb={1.5}>
      <Grid container>
        <Grid item xs={12} sm={9}>
          <Link href={'/articles'} style={{ textDecoration: 'none' }}>
            <Button
              sx={{ color: palette.mode === 'light' ? '#000' : '#fff' }}
              variant="outlined"
              color="primary"
              startIcon={<ArticleProfileIcon />}
            >
              Article/Blog
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box display={{ xs: 'none', sm: 'block' }} pl={2}>
            <Typography variant="subtitle1">Recent Articles</Typography>
          </Box>
        </Grid>
      </Grid>
    </HeaderSection>
  );
}
