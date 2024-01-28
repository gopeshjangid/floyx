'use client';

import { useGetArticlesByAuthorQuery } from '@/lib/redux/slices/articleDetails';
import { Box, Typography, Grid, Stack, Avatar, Skeleton } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import UserAvatar from '../UserAvatar';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';
import { useSession } from 'next-auth/react';

export default function AuthorArticles({ username }: { username: string }) {
  const { palette } = useTheme();
  const router = useRouter();
  const session = useSession();

  const { data: articleList, isLoading } = useGetArticlesByAuthorQuery({
    username: username,
    pageSize: 6,
  });
  return (
    <Box>
      <Typography variant="h5">More From Author</Typography>
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
            <>
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
                      padding: '16px',
                    }}
                    direction="row"
                    alignItems={'center'}
                    gap={1}
                  >
                    <Image
                      width={0}
                      height={0}
                      style={{ width: '120px', height: '80px' }}
                      sizes="100vw"
                      src={article?.coverPhotoThumbnail}
                      alt="coverPhotoThumbnail"
                    />
                    <Typography className="text-clamp-2">
                      {article?.title ? article?.title : '(No title)'}
                    </Typography>
                  </Stack>
                </Grid>
              )}
            </>
          ))}
      </Grid>
    </Box>
  );
}
