import React, { Suspense } from 'react';
import { Box, Typography, Grid, Stack, Skeleton } from '@mui/material';
import Image from 'next/image';
import UsernameLink from '../usernameLink';
import CalendarIcon from '@/images/image/calendarIcon';
import moment from 'moment';
import UserAvatar from '../UserAvatar';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';
import SocialButts from './socialMediaButtons';
import AuthorPoints from './authorPoints';
import TranslateIcon from '@/assets/images/svg/translateIcon';
import ArticleTags from './articleTags';
import {
  ArticleDescription,
  ArticleTypographyHeading,
  ArticleUserName,
} from './articleStyled';

export default function FullArticle({ details }: any) {
  const CONTENT =
    details?.article?.content && JSON.parse(details?.article?.content);
  const createMarkup = (htmlString: string) => {
    return { __html: htmlString };
  };
  return (
    <Box>
      <Box>
        <ArticleTypographyHeading variant="h1">
          {details?.article?.title}
        </ArticleTypographyHeading>
      </Box>
      <Box py={2}>
        <Grid container spacing={1}>
          <Grid item xs={2} sm={1}>
            <UserAvatar
              alt={details?.user?.name}
              src={`${ApiEndpoint.CurrentUserDetails}/avatar/${details?.user?.username}`}
              sx={{ width: '50px', height: '50px' }}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <ArticleUserName variant="subtitle1">
              {details?.user?.name}
            </ArticleUserName>
            <UsernameLink
              variant="subtitle2"
              username={details?.user?.username}
            />
            <Stack direction="row" gap={0.5} alignItems="center">
              <CalendarIcon />
              <Typography
                variant="caption"
                sx={{ opacity: 0.6, marginTop: '8px' }}
              >
                {moment(details?.article?.publicationDate).format('MMM DD, YY')}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Suspense
              fallback={
                <Skeleton variant="text" width={'100%'} height="40px" />
              }
            >
              <AuthorPoints details={details} />
            </Suspense>
          </Grid>
        </Grid>
      </Box>
      <Suspense
        fallback={<Skeleton variant="text" width={'100%'} height="40px" />}
      >
        {details?.article?.tags && (
          <ArticleTags tags={details?.article?.tags} />
        )}
      </Suspense>
      {details?.article?.coverPhotoPath && (
        <Box sx={{ borderRadius: '8px', overflow: 'hidden' }}>
          <Image
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '100%' }}
            src={details?.article?.coverPhotoPath}
            alt="thumbnail"
          />
        </Box>
      )}
      <Box sx={{ marginTop: '20px', wordWrap: 'break-word' }}>
        {CONTENT &&
          CONTENT.map((val: any, index: number) => (
            <Box sx={{ padding: '10px 0' }} key={`articleDetail${index}`}>
              {val?.type === 'paragraph' ? (
                <ArticleDescription
                  variant="body1"
                  dangerouslySetInnerHTML={createMarkup(val?.value)}
                />
              ) : (
                <ArticleDescription
                  variant="body1"
                  dangerouslySetInnerHTML={createMarkup(val?.value)}
                />
              )}
            </Box>
          ))}
      </Box>
      <Box display={'flex'} py={1}>
        <TranslateIcon />
        &nbsp;
        <Typography variant="body2">EN</Typography>
      </Box>
      <Box py={1}>
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <SocialButts details={details} />
        </Suspense>
      </Box>
    </Box>
  );
}
