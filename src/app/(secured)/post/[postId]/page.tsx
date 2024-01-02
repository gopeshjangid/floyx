'use client';
import DefaultPageSkelton from '@/components/DefaultPageSkelton';
import LoginHeader from '@/components/LoginHeader';
import Post from '@/components/Post/Post';
import { useGetCommentListQuery } from '@/lib/redux/slices/comments';
import { useGetPostDetailQuery } from '@/lib/redux/slices/posts';
import { Grid } from '@mui/material';

export default function Page({ params }: { params: { postId: string } }) {
  const { data: postDetail, isLoading } = useGetPostDetailQuery(params.postId);
  const { data: commentList } = useGetCommentListQuery(params.postId);

  return (
    <>
      <LoginHeader />
        {isLoading ? (
          <DefaultPageSkelton showOnlyContent />
        ) : (
          postDetail && (
            <Post
              name={postDetail?.author?.name}
              username={postDetail?.author?.username}
              createdDateTime={postDetail?.post?.createdDateTime}
              content={postDetail?.post?.content}
              shared={postDetail?.post?.shared}
              image={postDetail?.post?.image}
              link={postDetail?.post?.link}
              postDetails={postDetail?.post}
              postId={postDetail?.id}
              showComments={true}
            />
          )
        )}
    </>
  );
}
