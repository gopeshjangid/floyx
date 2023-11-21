import { PostBox } from '@/components/Post/styledPostBox';
import { Box } from '@mui/material';
import ArticleContainer from './articleContainer';

const ARTICLE_CONTENT_DATA = [
  {
    id: '6541fdf6301aa5402404928d',
    author: {
      id: '5efdbf14fb6be50001cbc36c',
      name: 'Saddam Husain Khan',
      username: 'saddam_beta',
      avatar: '/api/v1/Users/details/avatar/saddam_beta',
    },
    post: {
      id: '6541fdf6301aa5402404928d',
      createdDateTime: 1698823670000,
      link: {
        url: '/article/chirag/test-article-00014234d0',
        title: 'Test article',
        description: 'nwnxuhb niuuxweux iubwewebx hbwh uybxwub ubuhbwu',
        thumbnailPath: 'https://floyx-beta.s3.amazonaws.com/article/bfa36c00179b4a3495f6186253c17438.png',
        publishedDate: '2023-12-18T10:21:30.614Z',
      },
    },
  },
  {
    id: '6541fdf6301aa5402404928d',
    author: {
      id: '5efdbf14fb6be50001cbc36c',
      name: 'Saddam Husain Khan',
      username: 'saddam_beta',
      avatar: '/api/v1/Users/details/avatar/saddam_beta',
    },
    post: {
      id: '6541fdf6301aa5402404928d',
      createdDateTime: 1698823670000,
      link: {
        url: '/article/chirag/test-article-00014234d0',
        title: 'Test article',
        description: 'nwnxuhb niuuxweux iubwewebx hbwh uybxwub ubuhbwu',
        thumbnailPath: 'https://floyx-beta.s3.amazonaws.com/article/bfa36c00179b4a3495f6186253c17438.png',
        publishedDate: '2020-12-18T10:21:30.614Z',
      },
    },
  },
  {
    id: '6541fdf6301aa5402404928d',
    author: {
      id: '5efdbf14fb6be50001cbc36c',
      name: 'Saddam Husain Khan',
      username: 'saddam_beta',
      avatar: '/api/v1/Users/details/avatar/saddam_beta',
    },
    post: {
      id: '6541fdf6301aa5402404928d',
      createdDateTime: 1698823670000,
      link: {
        url: '/article/chirag/test-article-00014234d0',
        title: 'Test article',
        description: 'nwnxuhb niuuxweux iubwewebx hbwh uybxwub ubuhbwu',
        thumbnailPath: 'https://floyx-beta.s3.amazonaws.com/article/bfa36c00179b4a3495f6186253c17438.png',
        publishedDate: '2020-12-18T10:21:30.614Z',
      },
    },
  },
  {
    id: '6541fdf6301aa5402404928d',
    author: {
      id: '5efdbf14fb6be50001cbc36c',
      name: 'Saddam Husain Khan',
      username: 'saddam_beta',
      avatar: '/api/v1/Users/details/avatar/saddam_beta',
    },
    post: {
      id: '6541fdf6301aa5402404928d',
      createdDateTime: 1698823670000,
      link: {
        url: '/article/chirag/test-article-00014234d0',
        title: 'Test article',
        description: 'nwnxuhb niuuxweux iubwewebx hbwh uybxwub ubuhbwu',
        thumbnailPath: 'https://floyx-beta.s3.amazonaws.com/article/bfa36c00179b4a3495f6186253c17438.png',
        publishedDate: '2020-12-18T10:21:30.614Z',
      },
    },
  },
  {
    id: '6541fdf6301aa5402404928d',
    author: {
      id: '5efdbf14fb6be50001cbc36c',
      name: 'Saddam Husain Khan',
      username: 'saddam_beta',
      avatar: '/api/v1/Users/details/avatar/saddam_beta',
    },
    post: {
      id: '6541fdf6301aa5402404928d',
      createdDateTime: 1698823670000,
      link: {
        url: '/article/chirag/test-article-00014234d0',
        title: 'Test article',
        description: 'nwnxuhb niuuxweux iubwewebx hbwh uybxwub ubuhbwu',
        thumbnailPath: 'https://floyx-beta.s3.amazonaws.com/article/bfa36c00179b4a3495f6186253c17438.png',
        publishedDate: '2020-12-18T10:21:30.614Z',
      },
    },
  },
  {
    id: '6541fdf6301aa5402404928d',
    author: {
      id: '5efdbf14fb6be50001cbc36c',
      name: 'Saddam Husain Khan',
      username: 'saddam_beta',
      avatar: '/api/v1/Users/details/avatar/saddam_beta',
    },
    post: {
      id: '6541fdf6301aa5402404928d',
      createdDateTime: 1698823670000,
      link: {
        url: '/article/chirag/test-article-00014234d0',
        title: 'Test article',
        description: 'nwnxuhb niuuxweux iubwewebx hbwh uybxwub ubuhbwu',
        thumbnailPath: 'https://floyx-beta.s3.amazonaws.com/article/bfa36c00179b4a3495f6186253c17438.png',
        publishedDate: '2020-12-18T10:21:30.614Z',
      },
    },
  },
];

export default async function ArticleContent() {
  await new Promise(res => setTimeout(res, 5000))
  return (
    <Box>
      {ARTICLE_CONTENT_DATA.map(data => (
        <ArticleContainer linkDetails={data?.post?.link} authorDetails={data?.author}/>
      ))}
    </Box>
  );
}
