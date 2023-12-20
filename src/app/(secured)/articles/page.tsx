'use client';
import React, { Suspense, useState, useEffect } from 'react';
import { Box, Grid, useMediaQuery } from '@mui/material';
import ArticleHead from '@/components/articleHead';
import ArticleContent from '@/components/articleContent';
import PostHeader from '@/components/PostHeader';
import SearchBarArcticleRight from '@/components/searchBar/searchBarArcticleRight';
import RecommendedTopics from '@/components/recommendedTopics/recommendedTopics';
import WhoToFollow from '@/components/whoToFollow';
import WhoToFollowLoader from '@/components/whoToFollow/loader';
import { useLazyGetArticleListQuery } from '@/lib/redux';

export default function Page() {
  const isMobile = useMediaQuery('(max-width:480px)');
  const [tabName, setTabName] = useState('liked?limited=true');
  const [getArticleList, { data: articleList, isFetching }] =
    useLazyGetArticleListQuery();

  useEffect(() => {
    getArticleList(tabName);
  }, [tabName]);

  return (
    <Box p={isMobile ? 2 : 0}>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={9} marginTop={2} marginBottom={2}>
          <Grid sx={{ width: { xs: '100%', sm: '100%' }, padding: '0 20px' }}>
            <PostHeader />
            <ArticleHead setTabName={setTabName} />
            <ArticleContent
              articleList={articleList}
              loadingList={isFetching}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3} paddingRight={1} paddingLeft={1}>
          <SearchBarArcticleRight />
          <RecommendedTopics />
          <Suspense fallback={<WhoToFollowLoader />}>
            <WhoToFollow />
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  );
}
