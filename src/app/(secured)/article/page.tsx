'use client'
import React, { Suspense, useState } from 'react';
import { Grid } from '@mui/material';
import LoadingArticleHead from './loading';
import ArticleHead from '@/components/articleHead';
import ArticleContent from '@/components/articleContent';
import PostHeader from "@/components/PostHeader";

export default function Page() {
  const [articleList, setArticleList] = useState([])
  return (
    <Grid sx={{ width:  { xs: '100%', sm: '100%' }, padding: '0 20px' }}>
      <PostHeader />
      <ArticleHead setArticleList={setArticleList}/>
      <Suspense fallback={<LoadingArticleHead />}>
        <ArticleContent articleList={articleList}/>
      </Suspense>
    </Grid>
  );
}
