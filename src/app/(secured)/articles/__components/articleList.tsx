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
import { useLazyGetArticleByTagsQuery } from '@/lib/redux/slices/tags';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

function ArticleList() {
  const isMobile = useMediaQuery('(max-width:480px)');
  const [tabName, setTabName] = useState('liked?limited=true');

  const [dynamicTab, setDynamicTab] = useState({
    searchBy: undefined,
    value: undefined,
    tagId: undefined,
  });

  const [getArticleList, { data: articleList, isFetching }] =
    useLazyGetArticleListQuery();

  const [
    getArticlesByTag,
    { data: articleListByTags, isFetching: articleListFetching },
  ] = useLazyGetArticleByTagsQuery();
  const [
    searchArticle,
    { data: searchedArticle, isFetching: searchIsFetching },
  ] = useLazyGetSearchArticleQuery();

  useEffect(() => {
    if (tabName !== dynamicTab.tagId) {
      getArticleList(tabName);
    } else if (dynamicTab.searchBy === 'tag' && dynamicTab.tagId) {
      getArticlesByTag({ tagId: dynamicTab.tagId });
    } else if (dynamicTab.searchBy === 'search' && dynamicTab.tagId) {
      searchArticle({ searchString: dynamicTab.value ?? '' });
    }
  }, [tabName]);
const {t}=useTranslation()
  return (
    <Box p={isMobile ? 2 : 2} mt={2}>
      <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={9} marginBottom={2}>
          <Box
            sx={{
              overflow: 'auto',
              maxHeight: '102vh',
              overflowY: 'auto',
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
                  <span translate="no">{t("secure.article.label.text1")}</span>
                </GradientButton>
              </Link>
            </Box>
            <ArticleContent
              articleList={
                tabName !== dynamicTab.tagId
                  ? articleList
                  : dynamicTab.searchBy === 'tag' && dynamicTab.tagId
                    ? articleListByTags
                    : searchedArticle
              }
              loadingList={
                tabName !== dynamicTab.tagId
                  ? isFetching
                  : dynamicTab.searchBy === 'tag' && dynamicTab.tagId
                    ? articleListFetching
                    : searchIsFetching
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

export default React.memo(ArticleList);
