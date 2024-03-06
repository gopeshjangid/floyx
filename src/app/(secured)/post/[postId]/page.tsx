'use client';
import { Alert, Box } from '@mui/material';
import DefaultPageSkelton from '@/components/DefaultPageSkelton';
import LoginModal from '@/components/LoginModal';
import Post from '@/components/Post/Post';
import { useGetPostDetailQuery } from '@/lib/redux/slices/posts';
import { useSelector } from 'react-redux';
import { ReduxState } from '@/lib/redux';
import { getUserBlockStatusMessage, userBlockedStatus } from '@/lib/utils';

export default function Page({ params }: { params: { postId: string } }) {
  const { data: postDetail, isLoading } = useGetPostDetailQuery(params.postId);
  const { openLoginModel } = useSelector(
    (state: ReduxState) => state.appReducer
  );
  const isBlocked = userBlockedStatus.indexOf(String(postDetail)) > -1;
  if (isBlocked) {
    return <Alert severity="error">{getUserBlockStatusMessage(postDetail)}</Alert>
  }

  return (
    <>
      {openLoginModel && <LoginModal isForceOpened={true} />}
      {isLoading ? (
        <DefaultPageSkelton showOnlyContent />
      ) : (
        <Box>
          <div style={{cursor:"pointer"}} onClick={() => window.location.href = '/'}>Back to home</div>
          {postDetail && postDetail?.author?.username && (
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
          )}
        </Box>
      )}
    </>
  );
}
