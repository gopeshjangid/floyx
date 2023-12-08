'use client';
import React from 'react';
import AuthorCoulmn from '@/components/fullArticle/authorColumn';
import FullArticle from '@/components/fullArticle/fullArticle';
import LikesComments from '@/components/fullArticle/likesComments';
import TipColumn from '@/components/fullArticle/tipCoumn';
import { Container, Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useGetArticleDetailsQuery } from '@/lib/redux/slices/articleDetails';

export default function Page() {
  const url = usePathname();
  const urlArray= url?.split('/');
  const userName = urlArray ? urlArray[2] : '';
  const articlePuclicUrl = urlArray ? urlArray[3] : '';
  const { data: articleDetails } = useGetArticleDetailsQuery({userName, articlePuclicUrl})
  const articleId = articleDetails?.article?.id
  return (
    <Container sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ width: '70%' }}>
        {articleId && (
          <>
            <FullArticle details={articleDetails} />
            <TipColumn details={articleDetails} articlePuclicUrl={articlePuclicUrl} articleId={articleId}/>
            <AuthorCoulmn details={articleDetails}/>
            <LikesComments
              likesCommentsDetails={articleDetails?.article}
              userDetail={articleDetails?.user?.avatar}
              itemId={articleId}
            />
          </>
        )}
      </Box>
    </Container>
  );
}
