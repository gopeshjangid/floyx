import React, { Suspense } from 'react';
import AuthorCoulmn from '@/components/fullArticle/authorColumn';
import FullArticle from '@/components/fullArticle/fullArticle';
import LikesComments from '@/components/fullArticle/likesComments';
import TipColumn from '@/components/fullArticle/tipCoumn';
import { Alert, Skeleton, useMediaQuery } from '@mui/material';
import { fetchServerData } from '@/lib/utils';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';
import { Metadata, ResolvingMetadata } from 'next';
// import RecommendedTopics from '@/components/recommendedTopics/recommendedTopics';
import LoginHeader from '@/components/LoginHeader';
import { revalidateTag } from 'next/cache';
import LoginModal from '@/components/LoginModal';

async function Page({ params }: any) {
  // const isMobile = useMediaQuery('(max-width:480px)');
  const userName = params?.userName;
  const articlePuclicUrl = params?.articlePublicUrl;
  const { data: articleDetails, isError } = await fetchServerData(
    `${ApiEndpoint.GetArticles}/${userName}/${articlePuclicUrl}`
  );
  const articleId = articleDetails?.article?.id;

  async function revalidate() {
    'use server';
    revalidateTag('articleDetail');
  }

  return (
    <>
      {/* {!isMobile && <LoginHeader />}
      {isMobile && <LoginModal />} */}
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
                revalidate={revalidate}
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
                itemId={articleId}
                showComments={true}
                articleId={articleId}
                isArticle
                revalidate={revalidate}
              />
            </Suspense>
          </section>
          <section>
            {/* <Suspense
              fallback={
                <Skeleton variant="rectangular" width="100%" height="60px" />
              }
            >
              <RecommendedTopics
                setDynamicTab={articleDetails?.article?.tags ?? []}
              />
            </Suspense> */}
          </section>
        </>
      )}
    </>
  );
}

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
