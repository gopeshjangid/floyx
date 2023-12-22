import React, { Suspense } from 'react';
import AuthorCoulmn from '@/components/fullArticle/authorColumn';
import FullArticle from '@/components/fullArticle/fullArticle';
import LikesComments from '@/components/fullArticle/likesComments';
import TipColumn from '@/components/fullArticle/tipCoumn';
import { Container, Box, Alert, Skeleton } from '@mui/material';
import { fetchServerData } from '@/lib/utils';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';

async function Page({ params, page, get } : any) {
  const userName = params?.userName;
  const articlePuclicUrl = params?.articlePublicUrl;
  const { data: articleDetails, isError } = await fetchServerData(
    `${ApiEndpoint.GetArticles}/${userName}/${articlePuclicUrl}`
  );

  console.log('data', articleDetails);
  const articleId = articleDetails?.article?.id;
  // const { data: commentList } = useGetCommentListQuery(
  //   articleDetails?.article?.id || ''
  // );

  return (
    <Container
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '70%' }}>
        {isError && <Alert severity="error">Something went wrong</Alert>}
        {articleId && (
          <>
            <FullArticle details={articleDetails} />
            <Suspense
              fallback={
                <Skeleton variant="rectangular" width="100%" height="30px" />
              }
            >
              <TipColumn
                details={articleDetails}
                articlePuclicUrl={articlePuclicUrl}
                articleId={articleId}
              />
            </Suspense>
            <Suspense
              fallback={
                <Skeleton variant="rectangular" width="100%" height="300px" />
              }
            >
              <AuthorCoulmn details={articleDetails} />
            </Suspense>

            <Suspense
              fallback={
                <Skeleton variant="rectangular" width="100%" height="60px" />
              }
            >
              <LikesComments
                likesCommentsDetails={articleDetails?.article}
                userDetail={articleDetails?.user?.avatar}
                itemId={articleId}
                commentList={[]}
                showComments={true}
              />
            </Suspense>
          </>
        )}
      </Box>
    </Container>
  );
}

export default Page;
