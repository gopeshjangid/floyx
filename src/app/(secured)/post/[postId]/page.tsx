import Post from "@/components/Post/Post"
import { Grid } from "@mui/material"

const postDetail = {
    "id": "652241bfda29c95e1800df45",
    "author": {
        "id": "5efdbf14fb6be50001cbc36c",
        "name": "Saddam Husain Khan",
        "username": "saddam_beta",
        "avatar": "/api/v1/Users/details/avatar/saddam_beta",
        "official": false,
        "accountType": 0
    },
    "post": {
        "id": "652241bfda29c95e1800df45",
        "createdDateTime": 1696743871000,
        "numberOfComments": 1,
        "numberOfShares": 1,
        "numberOfLikes": 0,
        "likedByAuthor": false,
        "type": 4,
        "content": "nnnnn",
        "image": {
            "thumbnailPath": "https://floyx-beta.s3.amazonaws.com/article/bfa36c00179b4a3495f6186253c17438.png",
            "path": "https://floyx-beta.s3.amazonaws.com/article/bfa36c00179b4a3495f6186253c17438.png"
        },
        "link": null,
        "shared": null,
        "promoted": false,
        "isSharedPostAvailable": true
    },
    "lastComment": null
}

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
export default function Page({ params }: { params: { postId: number } }) {
  return (
    <Grid sx={{ width:  { xs: '100%', sm: '70%' } }}>
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
        commentList={commentList}
      />      
    </Grid>
  )
}

