/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
import { baseQuery } from '@/lib/utils';

interface Posts {
  postData: Array<string>;
  allPostRecived: boolean;
}
// Define a type for the slice state
const initialState: Posts = {
  postData: [],
  allPostRecived: true,
};

interface PostDetail {
  pageNumber: number;
  postCreatedDate: number | string;
}

interface Author {
  id: string;
  name: string;
  username: string;
  avatar: string;
  official: boolean;
  accountType: number;
}

export interface Post {
  id: string;
  createdDateTime: number;
  numberOfComments: number;
  numberOfShares: number;
  numberOfLikes: number;
  likedByAuthor: boolean;
  type: number;
  content: string;
  image: {
    thumbnailPath: string;
    path: string;
  };
  link: null | string;
  shared: null | string;
  promoted: boolean;
  isSharedPostAvailable: boolean;
}

export interface PostDetailResult {
  author: Author;
  id: string;
  lastComment: string;
  post: Post;
}

type PostListByUserArgs = {
  username: string;
  pageNumber?: number;
  postCreatedDate: number | string;
};

interface sharePostArgs {
  postId: string;
  payload: {
    content: string;
  };
}

const onCreateQueryStarted = async (
  currentArg,
  { queryFulfilled, dispatch, getState }
) => {
  // Optimistic update: remove the post from cache immediately
  let patchGetPostResult = { undo: () => {} };
  let patchGetPostListByUserResult = { undo: () => {} };
  try {
    const { data } = await queryFulfilled;
    const currentState = getState();
    // Assuming these functions return an array of args
    const postListByUserArgs = postServices.util.selectCachedArgsForQuery(
      currentState,
      'getPostListByUser'
    );
    const getPostsArgs = postServices.util.selectCachedArgsForQuery(
      currentState,
      'getPosts'
    );

    const appendGetPost = arg => {
      patchGetPostResult = dispatch(
        postServices.util.updateQueryData('getPosts', arg, draft => {
          draft.postList.map(post => {
            if (post.id === currentArg?.postId) {
              post.post.numberOfShares = post.post.numberOfShares + 1;
            }
            return post;
          });
          draft.postList = [data, ...draft.postList];
        })
      );
    };

    const appendPostByUser = arg => {
      patchGetPostListByUserResult = dispatch(
        postServices.util.updateQueryData('getPostListByUser', arg, draft => {
          draft.postList.map(post => {
            if (post.id === currentArg?.postId) {
              post.post.numberOfShares = post.post.numberOfShares + 1;
            }
            return post;
          });
          draft.postList.unshift(data);
        })
      );
    };

    if (getPostsArgs.length > 0) {
      getPostsArgs.forEach(arg => {
        if (arg.pageNumber === 0) {
          appendGetPost(arg);
        }
      });
    } else {
      appendGetPost({
        pageNumber: 0,
        postCreatedDate: data.post.createdDateTime,
      });
    }

    postListByUserArgs.forEach(arg => {
      if (arg.pageNumber === 0) {
        appendPostByUser(arg);
      }
    });

    if (postListByUserArgs.length === 0) {
      appendPostByUser({
        username: data.author.username,
        pageNumber: 0,
        postCreatedDate: data.post.createdDateTime,
      });
    }
  } catch (error) {
    if (patchGetPostResult) patchGetPostResult.undo();
    if (patchGetPostListByUserResult) patchGetPostListByUserResult.undo();
  }
};

export const postServices = createApi({
  reducerPath: 'postsReducer',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getPostDetail: builder.query<PostDetailResult, string>({
      query: id => `${ApiEndpoint.GetPosts}/post/${id}`,
      transformResponse: (response: any) => response?.value?.data,
      providesTags: ['postDetail'],
    }),
    sharePost: builder.mutation<any, sharePostArgs>({
      query: ({ postId, payload }) => ({
        url: `${ApiEndpoint.SharePost}/${postId}`,
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: any) => response?.value?.data || {},
      onQueryStarted: onCreateQueryStarted,
    }),
    getPostListByUser: builder.query<
      { postList: PostDetailResult[]; hasMore: boolean },
      PostListByUserArgs
    >({
      query: ({ pageNumber, postCreatedDate, username }) => {
        const apiEndPoint = ApiEndpoint.GetPosts + `/${username}`;
        if (!pageNumber) {
          return apiEndPoint;
        }
        return `${apiEndPoint}?page=${pageNumber}&postCreatedDate=${
          !postCreatedDate ? '' : postCreatedDate
        }`;
      },
      transformResponse: (response: any) => ({
        postList: response?.value?.data || [],
        hasMore: response?.value?.hasMore,
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, otherArgs) => {
        if (currentCache) {
          return {
            postList: [...currentCache.postList, ...newItems.postList],
            hasMore: newItems.postList.length === 10,
          };
        } else
          return {
            postList: [...newItems.postList],
            hasMore: newItems.postList.length === 10,
          };
      },

      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },

      providesTags: (result, error, arg) => [
        {
          type: 'PostListByUser',
          id: `${arg.username}-${arg.pageNumber}-${arg.postCreatedDate}`,
        },
      ],
    }),
    getPosts: builder.query<
      { postList: PostDetailResult[]; hasMore: boolean },
      PostDetail
    >({
      query: ({ pageNumber, postCreatedDate }) => {
        const apiEndPoint = ApiEndpoint.GetPosts + `/feed/main`;
        if (!pageNumber) {
          return apiEndPoint;
        }
        return `${apiEndPoint}?page=${pageNumber}&postCreatedDate=${postCreatedDate}`;
      },
      transformResponse: (response: any) => ({
        postList: response?.value?.data || [],
        hasMore: response?.value?.hasMore,
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },

      merge: (currentCache, newItems, otherArgs) => {
        if (otherArgs.arg.pageNumber === 1) {
          console.log('page 1 so resetting cache', newItems.postList);
          return {
            postList: [...newItems.postList],
            hasMore: newItems.postList.length === 10,
          };
        }
        if (currentCache) {
          console.log(
            'getPost current cache merging',
            currentCache.postList.length,
            'pagn =>',
            otherArgs.arg.pageNumber
          );
          return {
            postList: [...currentCache.postList, ...newItems.postList],
            hasMore: newItems.postList.length === 10,
          };
        } else {
          console.log('getPost new  cache merging', newItems.postList.length);
          return {
            postList: [...newItems.postList],
            hasMore: newItems.postList.length === 10,
          };
        }
      },
      providesTags: (result, error, arg) => [
        { type: 'MainFeedList', id: 'ALL' },
      ],
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    createPost: builder.mutation<PostDetailResult, FormData>({
      query: initialPost => ({
        url: `${ApiEndpoint.AddNewPost}`,
        method: 'POST',
        body: initialPost,
      }),
      transformResponse: (response: any) => response?.value?.data,
      onQueryStarted: onCreateQueryStarted,
    }),
    deletePost: builder.mutation<any, string>({
      query: id => ({
        url: `${ApiEndpoint.DeletePost}/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (
        currentArg,
        { queryFulfilled, dispatch, getState }
      ) => {
        // Optimistic update: remove the post from cache immediately
        let patchGetPostResult = { undo: () => {} };
        let patchGetPostListByUserResult = { undo: () => {} };
        try {
          const currentState = getState();
          // Assuming these functions return an array of args
          const postListByUserArgs = postServices.util.selectCachedArgsForQuery(
            currentState,
            'getPostListByUser'
          );
          const getPostsArgs = postServices.util.selectCachedArgsForQuery(
            currentState,
            'getPosts'
          );
          getPostsArgs.forEach(arg => {
            patchGetPostResult = dispatch(
              postServices.util.updateQueryData('getPosts', arg, draft => {
                const deletedIndex = draft.postList.findIndex(
                  item => item.id === currentArg
                );
                if (deletedIndex !== -1) {
                  draft.postList.splice(deletedIndex, 1);
                }
              })
            );
          });
          postListByUserArgs.forEach(arg => {
            patchGetPostListByUserResult = dispatch(
              postServices.util.updateQueryData(
                'getPostListByUser',
                arg,
                draft => {
                  const deletedIndex = draft.postList.findIndex(
                    item => item.id === currentArg
                  );
                  if (deletedIndex !== -1) {
                    draft.postList.splice(deletedIndex, 1);
                  }
                }
              )
            );
          });

          await queryFulfilled;
        } catch (error) {
          if (patchGetPostResult) patchGetPostResult.undo();
          if (patchGetPostListByUserResult) patchGetPostListByUserResult.undo();
        }
      },
    }),
  }),
  tagTypes: [
    'Posts',
    'postDetail',
    'UserPostList',
    'PostListByUser',
    'MainFeedList',
    'LatestMainFeedList',
  ],
});

export const {
  useGetPostsQuery,
  useGetPostDetailQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostListByUserQuery,
  useSharePostMutation,
} = postServices;
