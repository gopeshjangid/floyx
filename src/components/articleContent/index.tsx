import React from 'react';
import ArticleContainer from './articleContainer';
import ArticleCardSkeleton from '../ArticleCardSkeleton';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, Skeleton, Stack, Typography, useTheme } from '@mui/material';


const LoaderSkeleton = () => {
  const { palette } = useTheme();
  return (
    <Box sx={{ background: palette.primary.mainBackground }} p={1}>
      <Stack my={2} gap={1}>
        <Stack direction="row" gap={1}>
          <Skeleton variant="circular" width={'60px'} height={'30px'} />
          <Skeleton variant="text" width={'100%'} height={30} />
          <Skeleton variant="text" width={'100%'} height={30} />
        </Stack>
        <Skeleton variant="rectangular" width={'100%'} height={100} />
        <Skeleton variant="text" width={'100%'} height={100} />
        <Skeleton variant="rectangular" width={'100%'} height={30} />
      </Stack>
    </Box>
  );
};


 function ArticleContent({
  articleList,
  loadingList,
  addEdittype = false,
  setIsEditing,
  setArticleId,
  setValue,
  setIsReset,
  hasMore,
  loadMore,
  scrollThreshold,
  mainContainerFeedRef,
  isLoading,
  islazy=false
}: any) {
  const { t } = useTranslation()   
  const { palette } = useTheme();
  return (
    <Box>
      {loadingList && !islazy ? (
        <ArticleCardSkeleton repeats={2} />
      ) : 
      !isLoading && Array.isArray(articleList) && articleList && articleList.length !== 0 ? (
        islazy ? 
        (
        <InfiniteScroll
              dataLength={articleList.length} //This is important field to render the next data
              next={loadMore}
              hasMore={hasMore}
              scrollThreshold={scrollThreshold}
              loader={<LoaderSkeleton key="loader-ininfite" />}
              scrollableTarget={mainContainerFeedRef.current}
              endMessage={
                <Box
                  translate="no"
                  sx={{
                    border: `1px solid ${palette.primary.boxBorder}`,
                    borderRadius: '10px',
                    background: palette.primary.mainBackground,
                  }}
                  p={1}
                  mt={1}
                >
                  <Typography
                    translate="no"
                    textAlign="center"
                    variant="subtitle1"
                    color="info"
                  >
                    {t('Home.postSection.seenAll')}
                  </Typography>
                </Box>
              }
            >
           { articleList?.map((data: any, index: number) => (
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
      }
      </InfiniteScroll>) :
      (articleList?.map((data: any, index: number) => (
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
    )
      )
      : (
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

export default React.memo(ArticleContent);
