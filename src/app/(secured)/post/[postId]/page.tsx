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
            "thumbnailPath": "https://s3.us-east-2.amazonaws.com/floyx-beta/post/8cd60beeba5e4f278b1ce425e67813fa.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231120/us-east-2/s3/aws4_request&X-Amz-Date=20231120T190606Z&X-Amz-SignedHeaders=host&X-Amz-Signature=d8169c4dab4a2d87e90e92d4d56765cc417e8baf9b5442f923e22a66192efc3e",
            "path": "https://s3.us-east-2.amazonaws.com/floyx-beta/post/2bf3ce92d75349ea8981c7dccd24699d.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231120/us-east-2/s3/aws4_request&X-Amz-Date=20231120T190606Z&X-Amz-SignedHeaders=host&X-Amz-Signature=26f9bbb4dcefc0b6bf5ccec3a93770a3c7c5a5010c2c65e047992172298d4aac"
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

