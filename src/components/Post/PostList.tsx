"use client"
import { useEffect, useState } from "react"
import { PostBox } from "./styledPostBox";
import Post from "./Post";

const PostData = [
    {
        "id": "654cecb5301aa54024049297",
        "author": {
            "id": "5efdbf14fb6be50001cbc36c",
            "name": "Saddam Husain Khan",
            "username": "saddam_beta",
            "avatar": "/api/v1/Users/details/avatar/saddam_beta",
            "official": false,
            "accountType": 0
        },
        "post": {
            "id": "654cecb5301aa54024049297",
            "createdDateTime": 1699540149000,
            "numberOfComments": 0,
            "numberOfShares": 0,
            "numberOfLikes": 0,
            "likedByAuthor": false,
            "type": 2,
            "content": "no nothing",
            "image": null,
            "link": null,
            "shared": {
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
            },
            "promoted": false,
            "isSharedPostAvailable": true
        },
        "lastComment": null
    },
    {
        "id": "6541fdf6301aa5402404928d",
        "author": {
            "id": "5efdbf14fb6be50001cbc36c",
            "name": "Saddam Husain Khan",
            "username": "saddam_beta",
            "avatar": "/api/v1/Users/details/avatar/saddam_beta",
            "official": false,
            "accountType": 0
        },
        "post": {
            "id": "6541fdf6301aa5402404928d",
            "createdDateTime": 1698823670000,
            "numberOfComments": 0,
            "numberOfShares": 0,
            "numberOfLikes": 0,
            "likedByAuthor": false,
            "type": 6,
            "content": "hjhjhjh",
            "image": null,
            "link": {
                "url": "/article/chirag/test-article-00014234d0",
                "title": "Test article",
                "description": null,
                "thumbnailPath": "https://floyx-beta.s3.amazonaws.com/article/bfa36c00179b4a3495f6186253c17438.png",
                "publishedDate": "2020-12-18T10:21:30.614Z",
                "startDate": null,
                "endDate": null
            },
            "shared": null,
            "promoted": false,
            "isSharedPostAvailable": true
        },
        "lastComment": null
    },
    {
        "id": "65341fb7185c1c7c4993c071",
        "author": {
            "id": "5efdbf14fb6be50001cbc36c",
            "name": "Saddam Husain Khan",
            "username": "saddam_beta",
            "avatar": "/api/v1/Users/details/avatar/saddam_beta",
            "official": false,
            "accountType": 0
        },
        "post": {
            "id": "65341fb7185c1c7c4993c071",
            "createdDateTime": 1697914807000,
            "numberOfComments": 0,
            "numberOfShares": 0,
            "numberOfLikes": 1,
            "likedByAuthor": false,
            "type": 4,
            "content": "Gopesh's Dream Car",
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
    },
    {
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
    },
    {
        "id": "652240e6da29c95e1800df43",
        "author": {
            "id": "5efdbf14fb6be50001cbc36c",
            "name": "Saddam Husain Khan",
            "username": "saddam_beta",
            "avatar": "/api/v1/Users/details/avatar/saddam_beta",
            "official": false,
            "accountType": 0
        },
        "post": {
            "id": "652240e6da29c95e1800df43",
            "createdDateTime": 1696743654000,
            "numberOfComments": 0,
            "numberOfShares": 0,
            "numberOfLikes": 0,
            "likedByAuthor": false,
            "type": 4,
            "content": "again new",
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
    },
    {
        "id": "65223fddda29c95e1800df41",
        "author": {
            "id": "5efdbf14fb6be50001cbc36c",
            "name": "Saddam Husain Khan",
            "username": "saddam_beta",
            "avatar": "/api/v1/Users/details/avatar/saddam_beta",
            "official": false,
            "accountType": 0
        },
        "post": {
            "id": "65223fddda29c95e1800df41",
            "createdDateTime": 1696743389000,
            "numberOfComments": 1,
            "numberOfShares": 0,
            "numberOfLikes": 1,
            "likedByAuthor": true,
            "type": 4,
            "content": "new test imggg",
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
    },
    {
        "id": "65223f72da29c95e1800df3f",
        "author": {
            "id": "5efdbf14fb6be50001cbc36c",
            "name": "Saddam Husain Khan",
            "username": "saddam_beta",
            "avatar": "/api/v1/Users/details/avatar/saddam_beta",
            "official": false,
            "accountType": 0
        },
        "post": {
            "id": "65223f72da29c95e1800df3f",
            "createdDateTime": 1696743282000,
            "numberOfComments": 0,
            "numberOfShares": 0,
            "numberOfLikes": 0,
            "likedByAuthor": false,
            "type": 4,
            "content": "new upload image test",
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
    },
    {
        "id": "65223ec6da29c95e1800df3d",
        "author": {
            "id": "5efdbf14fb6be50001cbc36c",
            "name": "Saddam Husain Khan",
            "username": "saddam_beta",
            "avatar": "/api/v1/Users/details/avatar/saddam_beta",
            "official": false,
            "accountType": 0
        },
        "post": {
            "id": "65223ec6da29c95e1800df3d",
            "createdDateTime": 1696743110000,
            "numberOfComments": 0,
            "numberOfShares": 0,
            "numberOfLikes": 0,
            "likedByAuthor": false,
            "type": 4,
            "content": "ddsdsdfsf",
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
    },
    {
        "id": "65223d18da29c95e1800df3b",
        "author": {
            "id": "5efdbf14fb6be50001cbc36c",
            "name": "Saddam Husain Khan",
            "username": "saddam_beta",
            "avatar": "/api/v1/Users/details/avatar/saddam_beta",
            "official": false,
            "accountType": 0
        },
        "post": {
            "id": "65223d18da29c95e1800df3b",
            "createdDateTime": 1696742680000,
            "numberOfComments": 0,
            "numberOfShares": 0,
            "numberOfLikes": 0,
            "likedByAuthor": false,
            "type": 4,
            "content": "jhjh",
            "image": {
                "thumbnailPath": "https://s3.us-east-2.amazonaws.com/floyx-beta/post/70fc19fe4f734b7eb9b9b4e749cc380c.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231109/us-east-2/s3/aws4_request&X-Amz-Date=20231109T161153Z&X-Amz-SignedHeaders=host&X-Amz-Signature=f0ce0675c50f622813530902389a184df6f821d0f7edabeabb9152a656ede201",
                "path": "https://s3.us-east-2.amazonaws.com/floyx-beta/post/66367a8cdf5845a58b2e9d2b939c9375.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231109/us-east-2/s3/aws4_request&X-Amz-Date=20231109T161153Z&X-Amz-SignedHeaders=host&X-Amz-Signature=05c3b6e29da87307d33662f49f6b5f484ac11fbb46bc60fda40dcfab32e06929"
            },
            "link": null,
            "shared": null,
            "promoted": false,
            "isSharedPostAvailable": true
        },
        "lastComment": null
    },
    {
        "id": "65195c02da29c95e1800df1b",
        "author": {
            "id": "5efdbf14fb6be50001cbc36c",
            "name": "Saddam Husain Khan",
            "username": "saddam_beta",
            "avatar": "/api/v1/Users/details/avatar/saddam_beta",
            "official": false,
            "accountType": 0
        },
        "post": {
            "id": "65195c02da29c95e1800df1b",
            "createdDateTime": 1696160770000,
            "numberOfComments": 0,
            "numberOfShares": 0,
            "numberOfLikes": 0,
            "likedByAuthor": false,
            "type": 2,
            "content": "dd",
            "image": null,
            "link": null,
            "shared": {
                "id": "6515dd98332560a89476dbef",
                "author": {
                    "id": "5f1c18699b27a70001cbcb77",
                    "name": "test1",
                    "username": "test1",
                    "avatar": "/api/v1/Users/details/avatar/test1",
                    "official": false,
                    "accountType": 0
                },
                "post": {
                    "id": "6515dd98332560a89476dbef",
                    "createdDateTime": 1695931800000,
                    "numberOfComments": 0,
                    "numberOfShares": 1,
                    "numberOfLikes": 1,
                    "likedByAuthor": false,
                    "type": 6,
                    "content": "",
                    "image": null,
                    "link": {
                        "url": "/article/saddam_beta/test-e58616aee0",
                        "title": "Test",
                        "description": null,
                        "thumbnailPath": "https://floyx-beta.s3.amazonaws.com/article/075ae2133edf46708d4f1c809a82b002.png",
                        "publishedDate": "2023-09-22T07:37:30.704Z",
                        "startDate": null,
                        "endDate": null
                    },
                    "shared": null,
                    "promoted": false,
                    "isSharedPostAvailable": true
                },
                "lastComment": null
            },
            "promoted": false,
            "isSharedPostAvailable": true
        },
        "lastComment": null
    }
]

interface postObj {
  id: string;
  author: any;
  post: {
    id: string;
    content: string;
    link: {
      thumbnailPath: string;
    }
  }
}
export default function PostList() {
  const [postData, setPostData] = useState<any>([])
  useEffect(() => {
    setPostData(PostData);
  }, [])
  return (
    <>
      {postData && postData.length && postData.map((val:any) => (
        <Post
          name={val?.author?.name || ''}
          username={val?.author?.username || ''}
          createdDateTime={val?.post?.createdDateTime}
          content={val?.post?.content}
          shared={val?.post?.shared}
          image={val?.post?.image}
          link={val?.post?.link}
        />
      ))}
    </>
  )
}

