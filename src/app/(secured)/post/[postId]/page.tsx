"use client";
import Post from "@/components/Post/Post"
import { useGetCommentListQuery } from "@/lib/redux/slices/articleDetails";
import { useGetPostDetailQuery } from "@/lib/redux/slices/posts";
import { Grid } from "@mui/material"

export default function Page({ params }: { params: { postId: string } }) {
  const {data: postDetail } = useGetPostDetailQuery(params.postId);
  const { data: commentList } = useGetCommentListQuery(params.postId);

  return (
    <Grid sx={{ width:  { xs: '100%', sm: '70%' } }} marginBottom={3}>
      {postDetail && <Post
        name={postDetail?.author?.name}
        username={postDetail?.author?.username}
        createdDateTime={postDetail?.post?.createdDateTime}
        content={postDetail?.post?.content}
        shared={postDetail?.post?.shared}
        image={postDetail?.post?.image}
        link={postDetail?.post?.link}
        postDetails={postDetail?.post}
        postId={postDetail?.id}
        commentList={commentList}
        showComments={true}
      />}   
    </Grid>
  )
}

