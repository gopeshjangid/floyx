import { Suspense } from 'react';
import { Box, Grid } from '@mui/material';
import LoadingArticleHead from './loading';
import ArticleHead from '@/components/articleHead';
import ArticleContent from '@/components/articleContent';

export default function Page({}) {
  return (
    <Grid sx={{ width:  { xs: '100%', sm: '70%' }, paddingRight: '20px' }}>
      <ArticleHead />
      <Suspense fallback={<LoadingArticleHead />}>
        <ArticleContent />
      </Suspense>
    </Grid>
  );
}
