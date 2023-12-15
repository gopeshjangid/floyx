'use client';

import React, { useEffect, useState } from 'react';

import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import AddArticleHead from '@/components/addArticleHead';
import AddArticleForm from '@/components/addArticleForm';
import { useGetArticleInfoQuery, useLazyGetArticleListQuery } from '@/lib/redux/slices/articleDetails';
import ArticleContent from "@/components/articleContent";

export default function Page() {
  const isMobile = useMediaQuery('(max-width:480px)');
  const [saveDraft, setSaveDraft] = useState(false);
  const [value, setValue] = useState<string>('newArticle');

  const [getArticleList, { data: articleList, isFetching }] = useLazyGetArticleListQuery();
  const { data: articleDraftNumbers } = useGetArticleInfoQuery();

  const getAllArticleList = (tabVal) => {
    switch (tabVal) {
      case "my":
        getArticleList(undefined);
        return;
      case "draft":
        getArticleList(tabVal);
        return;
      default:
        return;
        
    }
  }
  useEffect(() => {
    getAllArticleList(value);
  }, [value]);

  return (
    <Box p={isMobile ? 2 : 0}>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} display={"flex"} justifyContent={"center"}>
        <Grid item xs={12} sm={9} marginTop={2} marginBottom={2} >
          <Typography variant="h5" sx={{ padding: '15px 20px 0 0' }}>
            Article Editor
          </Typography>
          <AddArticleHead
            setSaveDraft={setSaveDraft}
            articleDraftNumbers={articleDraftNumbers}
            value={value}
            setValue={setValue}
          />
          {value === 'newArticle' && (
            <AddArticleForm
              saveDraft={saveDraft}
              setSaveDraft={setSaveDraft}
            />
          )}
          {value !== 'newArticle' && (
            <ArticleContent
              articleList={articleList}
              loadingList={isFetching}
              addEdittype={true}
            />
          )}
          
        </Grid>
      </Grid>
    </Box>
  );
}
