import { Suspense } from 'react';
import { Box } from "@mui/material"
import LoadingArticleHead from "../loading"
import ArticleHead from '../articleHead/page';
import ArticleContent from '../articleContent/page';

export default function Page({}) {
  return (
    <Box>
      <Suspense fallback={<LoadingArticleHead />}>
        <ArticleHead />
      </Suspense>
      <ArticleContent />
    </Box>
  )
}
