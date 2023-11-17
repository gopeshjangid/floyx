import MainContainer from '@/components/MainContainer';
import { Box } from '@mui/material';
import ArticleHead from './articleHead/page';
import { Suspense } from 'react';
import LoadingArticleHead from './loading';
import ArticleContent from './articleContent/page';

export default function Article() {
  return (
    <MainContainer
      isHeaderVisble={true}
      content={
        <Box>
          <Suspense fallback={<LoadingArticleHead />}>
            <ArticleHead />
          </Suspense>
          <ArticleContent />
        </Box>
      }
    />
  );
}
