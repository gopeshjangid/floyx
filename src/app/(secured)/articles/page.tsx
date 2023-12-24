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
import { GradientButton } from '@/components/gradientButton';

export default function Page() {
  const isMobile = useMediaQuery('(max-width:480px)');
  const [tabName, setTabName] = useState('liked?limited=true');
  const [getArticleList, { data: articleList, isFetching }] =
    useLazyGetArticleListQuery();

  useEffect(() => {
    getArticleList(tabName);
  }, [tabName]);

  const viewportHeight = (typeof window === "undefined" ? 1000 : window.innerHeight);

  return (
    <Box p={isMobile ? 2 : 2} mt={2}>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={9} marginBottom={2}>
          <Box
            sx={{
              overflow: 'auto',
              maxHeight: viewportHeight,
              overflowY: 'auto',
              scrollbarWidth: 'none', // For Firefox
              msOverflowStyle: 'none', // For IE 10+
              '&::-webkit-scrollbar': {
                display: 'none', // For Chrome, Safari, and newer versions of Edge
              },
            }}
          >
            <PostHeader />
            <ArticleHead setTabName={setTabName} />
            <Box
              width="100%"
              textAlign={'right'}
              pt={1}
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <GradientButton
                variant="outlined"
                color="primary"
                // sx={{ border: '1px solid white' }}
                // target="_blank"
                href="/composer/create"
                isSelected
              >
                <span>New Articles</span>
              </GradientButton>
            </Box>
            <ArticleContent
              articleList={articleList}
              loadingList={isFetching}
            />
          </Box>
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
