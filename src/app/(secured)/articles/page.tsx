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
import {
  useLazyGetArticleListQuery,
  useLazyGetSearchArticleQuery,
} from '@/lib/redux';
import { GradientButton } from '@/components/gradientButton';
//import { useLazyGetArticleByTagsQuery } from '@/lib/redux/slices/tags';
import Link from 'next/link';

export default function Page() {
  const isMobile = useMediaQuery('(max-width:480px)');
  const [tabName, setTabName] = useState('liked?limited=true');

  const [dynamicTab, setDynamicTab] = useState({
    searchBy: '',
    value: undefined,
    tagId: '',
  });

  const [getArticleList, { data: articleList, isFetching }] =
    useLazyGetArticleListQuery();

  useEffect(() => {
    if (window.location.hash) {
      setDynamicTab(tab => ({
        ...tab,
        searchBy: 'tag',
        tagId: window.location.hash.slice(1),
      }));
    }
  }, []);
  // const [
  //   getArticlesByTag,
  //   { data: articleListByTags, isFetching: articleListFetching },
  // ] = useLazyGetArticleByTagsQuery();
  const [
    searchArticle,
    { data: searchedArticle, isFetching: searchIsFetching },
  ] = useLazyGetSearchArticleQuery();

  useEffect(() => {
    if (tabName !== dynamicTab.tagId) {
      getArticleList(tabName);
    } else if (dynamicTab.searchBy === 'tag' && dynamicTab.tagId) {
      searchArticle({ searchString: dynamicTab.tagId });
    } else if (dynamicTab.searchBy === 'search' && dynamicTab.tagId) {
      searchArticle({ searchString: dynamicTab.value ?? '' });
    }
  }, [tabName]);

  return (
    <Box p={isMobile ? 2 : 2} mt={2}>
      <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={9} marginBottom={2}>
          <Box
            sx={{
              overflow: 'auto',
              maxHeight: '102vh',
              overflowY: 'auto',
              scrollbarWidth: 'none', // For Firefox
              msOverflowStyle: 'none', // For IE 10+
              '&::-webkit-scrollbar': {
                display: 'none', // For Chrome, Safari, and newer versions of Edge
              },
            }}
          >
            <PostHeader />
            <ArticleHead
              setTabName={setTabName}
              dynamicTab={dynamicTab.value}
              dynamicTabType={dynamicTab.tagId}
            />
            <Box
              width="100%"
              textAlign={'right'}
              pt={1}
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <Link href="/composer/create">
                <GradientButton variant="outlined" color="primary" isSelected>
                  <span>New Articles</span>
                </GradientButton>
              </Link>
            </Box>
            <ArticleContent
              articleList={
                tabName !== dynamicTab.tagId ? articleList : searchedArticle
              }
              loadingList={
                tabName !== dynamicTab.tagId ? isFetching : searchIsFetching
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} paddingRight={1} paddingLeft={1}>
          <SearchBarArcticleRight setDynamicTab={setDynamicTab} />
          <RecommendedTopics setDynamicTab={setDynamicTab} />
          <Suspense fallback={<WhoToFollowLoader />}>
            <WhoToFollow />
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  );
}
