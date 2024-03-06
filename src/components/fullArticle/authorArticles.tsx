'use client';

import { useGetArticlesByAuthorQuery } from '@/lib/redux/slices/articleDetails';
import { Box, Typography, Grid, Stack, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React,{useEffect} from 'react';
import CustomDescription from '../customDescription';
import { useTranslation } from 'react-i18next';
import { useSession } from 'next-auth/react';

export default function AuthorArticles({ username }: { username: string }) {
  const {t}=useTranslation()
  const { palette } = useTheme();
  const router = useRouter();
  const session = useSession();
  
  const { data: articleList, isLoading,refetch } = useGetArticlesByAuthorQuery({
    username: username,
    pageSize: 6,
  });
  const isSameUser = username === session.data?.user.username;
  useEffect(() => {
    if (session?.status !== 'loading' && session?.status !== 'unauthenticated' && !isSameUser) {
      refetch();
    }
  }, [session, isSameUser]);
  return (
    <Box>
      <Typography translate="no" variant="h5">
        {t('comp.fullArticle.moreFromAuthor')}
      </Typography>
      {isLoading && (
        <Box p={1}>
          <Skeleton width="100%" height="50px" variant="rectangular" />
        </Box>
      )}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ cursor: 'pointer', marginTop: '8px' }}
      >
        {articleList &&
          articleList.map(({ article, user }: any, index: number) => (
            <React.Fragment key={`author-article-${index}`}>
              {index < 4 && (
                <Grid
                  onClick={() =>
                    router.push(
                      '/article/' + username + '/' + article.publicUrl
                    )
                  }
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  key={index + 'article-'}
                >
                  <Stack
                    sx={{
                      border: `1px solid ${palette.primary.boxBorder}`,
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}
                    direction="row"
                    gap={1}
                  >
                    <Image
                      height={100}
                      width={160}
                      sizes="100vw"
                      src={article?.coverPhotoThumbnail}
                      alt="coverPhotoThumbnail"
                    />
                    <Box padding="20px 5px">
                      <CustomDescription className="text-clamp-2">
                        {article?.title
                          ? article?.title
                          : t('comp.fullArticle.noTitle')}
                      </CustomDescription>
                    </Box>
                  </Stack>
                </Grid>
              )}
            </React.Fragment>
          ))}
      </Grid>
    </Box>
  );
}
