'use client';
import { useMediaQuery } from '@mui/material';

import DefaultPageSkelton from '@/components/DefaultPageSkelton';
import LoginHeader from '@/components/LoginHeader';
import LoginModal from '@/components/LoginModal';
import Post from '@/components/Post/Post';
import { useGetPostDetailQuery } from '@/lib/redux/slices/posts';

export default function Page({ params }: { params: { postId: string } }) {
  const { data: postDetail, isLoading } = useGetPostDetailQuery(params.postId);
  const isMobile = useMediaQuery('(max-width:480px)');

  return (
    <>
      {!isMobile && <LoginHeader />}
      {isMobile && <LoginModal />}
      {isLoading ? (
        <DefaultPageSkelton showOnlyContent />
      ) : (
        postDetail && postDetail?.author?.username && (
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
        )
      )}
    </>
  );
}
