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
  useLazyGetArticleByTagsQuery
} from '@/lib/redux';
import { GradientButton } from '@/components/gradientButton';
// import { useLazyGetArticleByTagsQuery } from '@/lib/redux/slices/tags';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Page({searchParams}) {
  const isMobile = useMediaQuery('(max-width:480px)');
  const [tabName, setTabName] = useState('popular');

  const [dynamicTab, setDynamicTab] = useState({
    searchBy: '',
    value: undefined,
    tagId: '',
  });

  const [getArticleList, { data: articleList, isFetching }] =
    useLazyGetArticleListQuery();
  const [
    getArticlesByTags,
    { data: articleListByTags, isFetching: articleListFetching },
  ] = useLazyGetArticleByTagsQuery();
  const [
    searchArticle,
    { data: searchedArticle, isFetching: searchIsFetching },
  ] = useLazyGetSearchArticleQuery();

  const valueChanges = (val) => {
    if(searchParams?.id){
      removeQueryParam()
    }
    setDynamicTab(val);
  }
  
  const removeQueryParam = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('id'); 
    searchParams.delete('name'); 
    const newUrl = `${window.location.pathname}`;
    window.history.replaceState(null, '', newUrl);
  };

  useEffect(() => {
    if(searchParams?.id && searchParams?.name){
      setDynamicTab({
        searchBy: 'tag',
        tagId: searchParams.id,
        value: searchParams.name,
      });
    }
  },[searchParams?.id, searchParams?.name])

  useEffect(() => {
    if (dynamicTab.searchBy === 'tag') {
      getArticlesByTags({ tagId: dynamicTab.tagId })
    } else if (dynamicTab.searchBy === 'search') {

      searchArticle({ searchString: dynamicTab.value ?? '' });
    } else if (tabName !== dynamicTab.tagId) {
      getArticleList(tabName);
    }
  }, [tabName, dynamicTab]);
  const viewportHeight =
    typeof window === 'undefined' ? 1000 : window.innerHeight;
  const { t } = useTranslation()

  return (
    <Box p={isMobile ? 2 : 2} mt={2}>
      <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={9} marginBottom={2}>
          <Box
            sx={{
              overflow: 'auto',
              maxHeight: viewportHeight + 450,
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
              setDynamicTab={valueChanges}
            />
            <Box
              width="100%"
              textAlign={'right'}
              pt={1}
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <Link href="/composer/create">
                <GradientButton variant="outlined" color="primary" isSelected>
                  <span translate='no'>{t("secure.article.label.text1")}</span>
                </GradientButton>
              </Link>
            </Box>
            <ArticleContent
              articleList={
                dynamicTab.searchBy === 'tag' ? articleListByTags : (dynamicTab.searchBy === 'search' ? searchedArticle : articleList)
              }
              loadingList={
                dynamicTab.searchBy === 'tag' ? articleListFetching : (dynamicTab.searchBy === 'search' ? searchIsFetching : isFetching)

              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} paddingRight={1} paddingLeft={1}>
          <SearchBarArcticleRight setDynamicTab={valueChanges} />
          <RecommendedTopics setDynamicTab={valueChanges} />
          <Suspense fallback={<WhoToFollowLoader />}>
            <WhoToFollow />
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  );
}
