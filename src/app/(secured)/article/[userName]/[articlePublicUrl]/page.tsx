'use client';
import React, { useEffect } from 'react';
import AuthorCoulmn from '@/components/fullArticle/authorColumn';
import FullArticle from '@/components/fullArticle/fullArticle';
import LikesComments from '@/components/fullArticle/likesComments';
import TipColumn from '@/components/fullArticle/tipCoumn';
import { useGetUserDetailsQuery } from '@/lib/redux/slices/userDetails';
import { Container, Box, Typography, Button } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useGetArticleDetailsQuery } from '@/lib/redux/slices/articleDetails';
import { useGetCommentListQuery } from '@/lib/redux/slices/articleCommentList';

const ARTICLE_DETAILS = {
  article: {
    id: '6528186097206f0a2072b30d',
    title: 'AI Navigating the Landscape in the Autonomous Vehicles',
    coverPhotoPath: 'https://floyx-beta.s3.amazonaws.com/article/08407da950a9486c9a4a31504bcfb1c3.png',
    publicationDate: 1699276978000,
    publicUrl: 'article-publish-testing-0a2072b30d',
    numberOfLikes: 3001,
    likedByAuthor: false,
    numberOfShares: 80000000,
    numberOfComments: 8730000,
    content: [
      {
        autoFocus: true,
        index: 0,
        key: '48d6169d-444c-4a84-b21e-9ecf17022860',
        tooltip: false,
        type: 'paragraph',
        value:
          'Each of these categories has many different sections and genres, and there are many thousands of titles in each type. Every book title has an International Standard Book Number (ISBN) that is unique to it, and helps in identifying it. Today books are available as web versions too so that they can be read on the internet. They may be read on the modern kindle or on the computer. And books are available in audio versions too so that you can hear an entire book being read out aloud',
        tooltipIcon: false,
      },
      {
        autoFocus: true,
        index: 0,
        key: '48d6169d-444c-4a84-b21e-9ecf17022860',
        tooltip: false,
        type: 'subHeading',
        value: 'Read out aloud',
        tooltipIcon: false,
      },
      {
        autoFocus: true,
        index: 1,
        key: 'a616de3f-aa06-4a5d-88ed-b4cb8aec6320',
        tooltip: false,
        type: 'paragraph',
        value:
          'Books are man’s best friends. Books are portable and so they are easy to carry around. And so books can be read at any time night or day, while travelling on a bus or train or flight, and at meal time too. Books are published in many languages and in varied genres',
        tooltipIcon: true,
      },
      {
        autoFocus: true,
        index: 2,
        key: '7f3d537d-a94c-4c9d-8e52-36fc07663689',
        tooltip: false,
        type: 'paragraph',
        value:
          'We also have story books that we read for leisure and fun. We can get them from the school library. We can also buy them from bookshops. Books are printed on paper, and can have pictures too that make them interesting. We can read books on the computer as well.',
        tooltipIcon: true,
      },
      {
        autoFocus: true,
        index: 3,
        key: '04038b89-f622-49e0-a1c6-db69ec2666a2',
        tooltip: false,
        type: 'paragraph',
        value:
          'Each of these categories has many different sections and genres, and there are many thousands of titles in each type. Every book title has an International Standard Book Number (ISBN) that is unique to it, and helps in identifying it. Today books are available as web versions too so that they can be read on the internet. They may be read on the modern kindle or on the computer. And books are available in audio versions too so that you can hear an entire book being read out aloud',
        tooltipIcon: true,
      },
    ],
    commentsList: [
      {
        user: {
          id: '5efdbf14fb6be50001cbc36c',
          name: 'Michele Reena',
          username: 'mich23',
          avatar: '/api/v1/Users/details/avatar/saddam_beta',
          official: false,
          accountType: 0,
        },
        comment: {
          id: '6533cd44d44d0f9f0d0435ed',
          itemId: '652241bfda29c95e1800df45',
          createdDateTime: 1697893700000,
          content:
            "The discussion on AI bias is spot-on. It's a problem that demands our immediate attention, and the article does a great job.",
          numberOfLikes: 0,
          likedByAuthor: false,
        },
      },
      {
        user: {
          id: '5efdbf14fb6be50001cbc36c',
          name: 'Mike Egon',
          username: 'miky',
          avatar: '/api/v1/Users/details/avatar/saddam_beta',
          official: false,
          accountType: 0,
        },
        comment: {
          id: '6533cd44d44d0f9f0d0435ed',
          itemId: '652241bfda29c95e1800df45',
          createdDateTime: 1697893700000,
          content: "Her article perfectly encapsulates the ethical challenges surrounding AI. It's crucial that we address bias.",
          numberOfLikes: 0,
          likedByAuthor: false,
        },
      },
    ],
  },
  user: {
    numberOfArticles: 13,
    numberOfFollowers: 4230,
    about:
      'I accomplished and versatile article writer with a passion for storytelling through the written word. With a background in artificial intelligence i have honed a writing skills to craft engaging, informative, and thought content.',
    isFollowed: false,
    id: '5efdbf14fb6be50001cbc36c',
    name: 'Saddam Husain Khan',
    username: 'saddam_beta',
    avatar: '/api/v1/Users/details/avatar/saddam_beta',
    official: false,
    accountType: 0,
    nationality: 'Canada',
    websites: 'www.noraweb.com ',
    more: [
      {
        thumbnail: 'https://floyx-beta.s3.amazonaws.com/article/08407da950a9486c9a4a31504bcfb1c3.png',
        title: 'Cyber Security Trends',
      },
      {
        thumbnail: 'https://floyx-beta.s3.amazonaws.com/article/08407da950a9486c9a4a31504bcfb1c3.png',
        title: 'VR Health & Wellness',
      },
      {
        thumbnail: 'https://floyx-beta.s3.amazonaws.com/article/08407da950a9486c9a4a31504bcfb1c3.png',
        title: 'AI in Entertainment',
      },
      {
        thumbnail: 'https://floyx-beta.s3.amazonaws.com/article/08407da950a9486c9a4a31504bcfb1c3.png',
        title: 'AI and the Future',
      },
      {
        thumbnail: 'https://floyx-beta.s3.amazonaws.com/article/08407da950a9486c9a4a31504bcfb1c3.png',
        title: 'VR and Travel',
      },
      {
        thumbnail: 'https://floyx-beta.s3.amazonaws.com/article/08407da950a9486c9a4a31504bcfb1c3.png',
        title: 'Server Maintenance',
      },
    ],
  },
};

export default function Page() {
  const url = usePathname();
  const urlArray= url?.split('/');
  const userName = urlArray ? urlArray[2] : '';
  const articlePuclicUrl = urlArray ? urlArray[3] : '';
  const { data: userDetails } = useGetUserDetailsQuery(userName);
  const { data: articleDetails } = useGetArticleDetailsQuery({userName, articlePuclicUrl})
  const articleId = articleDetails?.article?.id
  return (
    <Container sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ width: '70%' }}>
        <FullArticle details={articleDetails}/>
        <TipColumn />
        <AuthorCoulmn authorDetails={ARTICLE_DETAILS} details={articleDetails} userDetails={userDetails}/>
        <LikesComments likesCommentsDetails={articleDetails} articleId={articleId}/>
      </Box>
    </Container>
  );
}
