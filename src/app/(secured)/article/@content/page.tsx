import { Suspense } from 'react';
import { Box } from '@mui/material';
import LoadingArticleHead from '../loading';
import ArticleHead from '@/components/articleHead';
import ArticleContent from '@/components/articleContent';

export default function Page({}) {
  return (
    <Box>
      <ArticleHead />
      <Suspense fallback={<LoadingArticleHead />}>
        <ArticleContent />
      </Suspense>
    </Box>
  );
}
