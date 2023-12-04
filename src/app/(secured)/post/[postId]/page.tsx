"use client";
import Post from "@/components/Post/Post"
import { useGetPostDetailQuery } from "@/lib/redux/slices/posts";
import { Grid } from "@mui/material"

const commentList = [
    {
        "user": {
            "id": "5efdbf14fb6be50001cbc36c",
            "name": "Saddam Husain Khan",
            "username": "saddam_beta",
            "avatar": "/api/v1/Users/details/avatar/saddam_beta",
            "official": false,
            "accountType": 0
        },
        "comment": {
            "id": "6533cd44d44d0f9f0d0435ed",
            "itemId": "652241bfda29c95e1800df45",
            "createdDateTime": 1697893700000,
            "content": "dasdasd",
            "numberOfLikes": 0,
            "likedByAuthor": false
        }
    }
];
export default function Page({ params }: { params: { postId: string } }) {
  const {data: postDetail } = useGetPostDetailQuery(params.postId);

  return (
    <Grid sx={{ width:  { xs: '100%', sm: '70%' } }}>
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
      />}   
    </Grid>
  )
}

