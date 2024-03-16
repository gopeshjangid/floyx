'use client';

import ArticleContent from '@/components/articleContent';
import { useGetArticleListQuery, useGetArticlesByAuthorQuery } from '@/lib/redux';
import { Box, Grid, useMediaQuery } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

export interface apiParams {
  pageSize: number;
  articleCreatedDate: number | '';
  username: string;
}

export default function ProfileArticleList({ parentRef }) {
  const params = useParams();
  const username = Array.isArray(params) ? params[0] : params?.username ?? '';
  const [apiParams, setApiParams] = useState<apiParams>({
    pageSize: 1,
    articleCreatedDate: '',
    username: username || '',
  });
  const { data, isFetching, isLoading } = useGetArticlesByAuthorQuery(apiParams);
  const articleList = data?.articlesList;
  useEffect(() => {
    if (username) {
      setApiParams((params) => ({ ...params, username, pageNumber: 1 }))
    }
   
  }, [username])

  const hasMore = typeof data?.hasMore != 'undefined' ? data?.hasMore : true;
  const loadMore = useCallback(() => {
    if (articleList?.length && !isFetching) {
      const lastArticle = articleList[articleList.length - 1];
      setApiParams(prevParams => ({
        ...prevParams,
        pageSize: prevParams.pageSize + 1,
        articleCreatedDate: lastArticle?.article?.publicationDate,
      }));
    }
  }, [articleList, isFetching, setApiParams]);
  
  // useEffect(() => {}, [articleList]);

  return (
    <Box>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={12} marginTop={2} marginBottom={2}>
          <ArticleContent 
          articleList={articleList} 
          loadingList={isFetching} 
          loadMore={loadMore} 
          hasMore={hasMore}
          scrollThreshold={0.7}
          isLoading={isLoading}
          mainContainerFeedRef={parentRef}
          islazy={true}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
