import React, { Suspense } from 'react';
import AuthorCoulmn from '@/components/fullArticle/authorColumn';
import FullArticle from '@/components/fullArticle/fullArticle';
import LikesComments from '@/components/fullArticle/likesComments';
import TipColumn from '@/components/fullArticle/tipCoumn';
import { Alert, Skeleton } from '@mui/material';
import { fetchServerData } from '@/lib/utils';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';

async function Page({ params, ...props }) {
  const userName = params?.userName;
  const articlePuclicUrl = params?.articlePublicUrl;
  const { data: articleDetails, isError } = await fetchServerData(
    `${ApiEndpoint.GetArticles}/${userName}/${articlePuclicUrl}`
  );

  const articleId = articleDetails?.article?.id;

  return (
    <>
      {isError && <Alert severity="error">Something went wrong</Alert>}
      {articleId && (
        <>
          <section>
            <FullArticle details={articleDetails} />
          </section>
          <section>
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
          </section>
          <section>
            <Suspense
              fallback={
                <Skeleton variant="rectangular" width="100%" height="300px" />
              }
            >
              <AuthorCoulmn details={articleDetails} />
            </Suspense>
          </section>
          <section>
            <Suspense
              fallback={
                <Skeleton variant="rectangular" width="100%" height="60px" />
              }
            >
              <LikesComments
                likesCommentsDetails={articleDetails?.article}
                userDetail={articleDetails?.user?.avatar}
                itemId={articleId}
                showComments={true}
                articleId={articleId}
              />
            </Suspense>
          </section>
        </>
      )}
    </>
  );
}

import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { userName: string; articlePublicUrl: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const userName = params?.userName;
  const articlePuclicUrl = params?.articlePublicUrl;
  const { data: articleDetails } = await fetchServerData(
    `${ApiEndpoint.GetArticles}/${userName}/${articlePuclicUrl}`
  );
  return {
    title: articleDetails?.article.title,
    openGraph: {
      images: [articleDetails?.article?.coverPhotoPath],
    },

    generator: 'Next.js',
    applicationName: 'Floyx',
    referrer: 'origin-when-cross-origin',
    keywords: articleDetails?.article?.tags ?? [],
    authors: [
      {
        name: articleDetails?.author?.name,
        url: articleDetails?.author?.avatar,
      },
    ],
    creator: articleDetails?.author?.name,
    publisher: articleDetails?.author?.name,
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en-US',
      },
    },
    // formatDetection: {
    //   email: false,
    //   address: false,
    //   telephone: false,
    // },
  };
}

export default Page;
