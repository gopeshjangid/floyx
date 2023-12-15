'use client';

import ArticleContent from '@/components/articleContent';
import { useGetArticleListQuery } from '@/lib/redux';
import { Box, Grid, useMediaQuery } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export interface apiParams {
  pageNumber: number;
  postCreatedDate: number;
}

export default function ProfileArticleList() {
  const params = useParams();
  const username = Array.isArray(params) ? params[0] : params.username ?? '';
  //   const [apiParams, setApiParams] = useState<apiParams>({
  //     pageNumber: 0,
  //     postCreatedDate: 0,
  //     username: params?.username ?? '',
  //   });

  const isMobile = useMediaQuery('(max-width:480px)');
  const { data: articleList, isFetching } = useGetArticleListQuery(username);

  //   const loadMore = (e: any, pageNumber: number, isFetching: boolean) => {
  //     if (articleList) {
  //       const lastPost = articleList[articleList.length - 1];
  //       if (e > pageNumber && lastPost !== undefined && !isFetching) {
  //         setApiParams({
  //           pageNumber: e,
  //           postCreatedDate: lastPost?.post?.createdDateTime,
  //         });
  //       }
  //     }
  //   };

  useEffect(() => {
    console.log('postData', articleList);
  }, [articleList]);

  return (
    <Box p={isMobile ? 2 : 0}>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={12} marginTop={2} marginBottom={2}>
          <ArticleContent articleList={articleList} loadingList={isFetching} />
        </Grid>
      </Grid>
    </Box>
  );
}
