'use client';

import React, { Suspense, useEffect, useState } from 'react';

import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import AddArticleHead from '@/components/addArticleHead';
import AddArticleForm from '@/components/addArticleForm';
import {
  useGetArticleInfoQuery,
  useLazyGetArticleListQuery,
} from '@/lib/redux/slices/articleDetails';
import ArticleContent from '@/components/articleContent';
import {useSearchParams } from 'next/navigation';

export default function Page() {
  const isMobile = useMediaQuery('(max-width:480px)');
  const [saveDraft, setSaveDraft] = useState(false);
  const [isPublish, setIsPublish] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [value, setValue] = useState<string>('newArticle');
  const [articleId, setArticleId] = useState<string | undefined>(undefined);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [isReset, setIsReset] = useState<boolean>(false);
  const query = useSearchParams();
  const [getArticleList, { data: articleList, isFetching }] =
    useLazyGetArticleListQuery();
  const { data: articleDraftNumbers } = useGetArticleInfoQuery();

  const getAllArticleList = tabVal => {
    switch (tabVal) {
      case 'my':
        getArticleList(undefined);
        return;
      case 'draft':
        getArticleList(tabVal);
        return;
      default:
        return;
    }
  };
  useEffect(() => {
    getAllArticleList(value);
  }, [value]);


  useEffect(()=>{
    if(query.size > 0){
      const value = query.get("value");
      const isEditning = query.get("isEditing");
      const articleId = query.get("articleId");
      if(value)
       setValue(value);
      if(articleId)
      setArticleId(articleId);
    if(isEditning) setIsEditing(isEditning ==='true');
    }
  },[query]);

  return (
    <Box p={isMobile ? 2 : 0}>
      <Grid
        container
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        display={'flex'}
        justifyContent={'center'}
      >
        <Grid item xs={12} sm={9} marginTop={2} marginBottom={2}>
          <Typography variant="h5" sx={{ padding: '15px 20px 0 0' }}>
            Article Editor
          </Typography>
          <Suspense fallback={<Typography>Loading...</Typography>}>
            <AddArticleHead
              setSaveDraft={setSaveDraft}
              setIsPublish={setIsPublish}
              isDisabled={isDisabled}
              articleDraftNumbers={articleDraftNumbers}
              value={value}
              setValue={setValue}
              isPublished={isPublished}
              setIsReset={setIsReset}
              setIsEditing={setIsEditing}
              setArticleId={setArticleId}
            />
          </Suspense>
          {value === 'newArticle' && (
            <AddArticleForm
              isPublish={isPublish}
              saveDraft={saveDraft}
              setIsPublish={setIsPublish}
              setIsDisabled={setIsDisabled}
              setSaveDraft={setSaveDraft}
              articleId={articleId}
              setArticleId={setArticleId}
              isEditing={isEditing}
              setIsPublished={setIsPublished}
              isReset={isReset}
            />
          )}
          {value !== 'newArticle' && (
            <ArticleContent
              articleList={articleList}
              loadingList={isFetching}
              addEdittype={true}
              setArticleId={setArticleId}
              setIsEditing={setIsEditing}
              setValue={setValue}
              setIsReset={setIsReset}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
