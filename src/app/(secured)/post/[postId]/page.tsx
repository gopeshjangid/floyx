'use client';
import { Box } from '@mui/material';
import DefaultPageSkelton from '@/components/DefaultPageSkelton';
import LoginModal from '@/components/LoginModal';
import Post from '@/components/Post/Post';
import { useGetPostDetailQuery } from '@/lib/redux/slices/posts';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ReduxState } from '@/lib/redux';

export default function Page({ params }: { params: { postId: string } }) {
  const { data: postDetail, isLoading } = useGetPostDetailQuery(params.postId);
  const { openLoginModel } = useSelector(
    (state: ReduxState) => state.appReducer
  );
  return (
    <>
      {openLoginModel && <LoginModal isForceOpened={true} />}
      {isLoading ? (
        <DefaultPageSkelton showOnlyContent />
      ) : (
        <Box>
          <Link href="/">Back to home</Link>
          {postDetail && postDetail?.author?.username && (
            <Post
              name={postDetail?.author?.name}
              username={postDetail?.author?.username}
              createdDateTime={postDetail?.post?.createdDateTime}
              content={postDetail?.post?.content}
              shared={postDetail?.post?.link}
              image={postDetail?.post?.image}
              link={postDetail?.post?.link}
              postDetails={postDetail?.post}
              postId={postDetail?.id}
              showComments={true}
            />
          )}
        </Box>
      )}
    </>
  );
}
