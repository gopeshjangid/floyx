'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Grid, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
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
  const { palette } = useTheme();

  return (
    <HeaderSection pb={1.5}>
      <Grid container>
        <Grid item xs={12} sm={9}>
          <Link href={'/articles'} style={{ textDecoration: 'none' }}>
            <Button
              sx={{ color: palette.mode === 'light' ? '#000' : '#fff' }}
              variant="outlined"
              color="primary"
              startIcon={<ArticleProfileIcon active={true} />}
            >
              Article/Blog
            </Button>
          </Link>
        </Grid>
      </Grid>
    </HeaderSection>
  );
}
