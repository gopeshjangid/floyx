import { Suspense } from 'react';
import { Grid } from '@mui/material';
import LoadingArticleHead from './loading';
import ArticleHead from '@/components/articleHead';
import ArticleContent from '@/components/articleContent';
import PostHeader from "@/components/PostHeader";

export default function Page() {
  return (
    <Grid sx={{ width:  { xs: '100%', sm: '70%' }, padding: '0 20px' }}>
      <PostHeader />
      <ArticleHead />
      <Suspense fallback={<LoadingArticleHead />}>
        <ArticleContent />
      </Suspense>
    </Grid>
  );
}
