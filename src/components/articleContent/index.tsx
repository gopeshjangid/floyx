import React, { Suspense, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ArticleContainer from './articleContainer';
import ArticleCardSkeleton from '../ArticleCardSkeleton';
import { useTranslation } from 'react-i18next';
export default function ArticleContent({
  articleList,
  loadingList,
  addEdittype = false,
  setIsEditing,
  setArticleId,
  setValue,
  setIsReset
}: any) {
  const { t } = useTranslation()   
  return (
    <Box>
      {loadingList ? (
        <ArticleCardSkeleton repeats={2} />
      ) : Array.isArray(articleList) && articleList && articleList.length !== 0 ? (
        articleList?.map((data: any, index: number) => (
          <ArticleContainer
            key={`articleContainer${index}`}
            articleDetails={data && data.article ? data.article : data}
            userDetails={data && data.user ? data.user : null}
            addEdittype={addEdittype}
            setIsEditing={setIsEditing}
            setArticleId={setArticleId}
            setValue={setValue}
            setIsReset={setIsReset}
          />
        ))
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10%',
            height: '100px',
          }}
        >
          <Typography translate="no" variant="h5">{t("comp.articleContent.noArticle")}</Typography>
        </Box>
      )}
    </Box>
  );
}
