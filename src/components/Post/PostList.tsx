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
                        "thumbnailPath": "https://s3.us-east-2.amazonaws.com/floyx-beta/post/8cd60beeba5e4f278b1ce425e67813fa.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231109/us-east-2/s3/aws4_request&X-Amz-Date=20231109T161152Z&X-Amz-SignedHeaders=host&X-Amz-Signature=cdf22134ace04176a0fb63d1f00cd7613990af339008f1ab130aca6c5e7db9f5",
                        "path": "https://s3.us-east-2.amazonaws.com/floyx-beta/post/2bf3ce92d75349ea8981c7dccd24699d.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231109/us-east-2/s3/aws4_request&X-Amz-Date=20231109T161152Z&X-Amz-SignedHeaders=host&X-Amz-Signature=2565249d28fcf35aa8cd008fc6c969bf7281aa6860807e05d4b0ee0ad18b8afe"
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
                "thumbnailPath": "https://s3.us-east-2.amazonaws.com/floyx-beta/post/2d28f62ca4654a60a0af58d0edc21568.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231109/us-east-2/s3/aws4_request&X-Amz-Date=20231109T161152Z&X-Amz-SignedHeaders=host&X-Amz-Signature=4d1950bdc30f766187721945ee219b0360700b24e43ad17523e9dac9a3383279",
                "path": "https://s3.us-east-2.amazonaws.com/floyx-beta/post/edc41b3795d542f0b58b98dda9de847e.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231109/us-east-2/s3/aws4_request&X-Amz-Date=20231109T161152Z&X-Amz-SignedHeaders=host&X-Amz-Signature=695e3e434e0051461ea00ae8c572526fad410434091d6280f63ab9daa3feae73"
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
                "thumbnailPath": "https://s3.us-east-2.amazonaws.com/floyx-beta/post/8cd60beeba5e4f278b1ce425e67813fa.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231109/us-east-2/s3/aws4_request&X-Amz-Date=20231109T161152Z&X-Amz-SignedHeaders=host&X-Amz-Signature=cdf22134ace04176a0fb63d1f00cd7613990af339008f1ab130aca6c5e7db9f5",
                "path": "https://s3.us-east-2.amazonaws.com/floyx-beta/post/2bf3ce92d75349ea8981c7dccd24699d.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231109/us-east-2/s3/aws4_request&X-Amz-Date=20231109T161152Z&X-Amz-SignedHeaders=host&X-Amz-Signature=2565249d28fcf35aa8cd008fc6c969bf7281aa6860807e05d4b0ee0ad18b8afe"
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
                "thumbnailPath": "https://s3.us-east-2.amazonaws.com/floyx-beta/post/503f5ae126b04d9fa15ba942dd2a8857.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231109/us-east-2/s3/aws4_request&X-Amz-Date=20231109T161153Z&X-Amz-SignedHeaders=host&X-Amz-Signature=66c23b0e3b71433534761538958563a52cea6910016feef17fcdcf79a484b360",
                "path": "https://s3.us-east-2.amazonaws.com/floyx-beta/post/7e36db632bdd4893aac16c8b9b7c91bb.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231109/us-east-2/s3/aws4_request&X-Amz-Date=20231109T161153Z&X-Amz-SignedHeaders=host&X-Amz-Signature=079f24bf9593ad47fecff9f3e5c1b2476f662b26b7a11c62422580460144976d"
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
                "thumbnailPath": "https://s3.us-east-2.amazonaws.com/floyx-beta/post/809cfa575eac4570a5a93a3395eb8f1d.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231109/us-east-2/s3/aws4_request&X-Amz-Date=20231109T161153Z&X-Amz-SignedHeaders=host&X-Amz-Signature=5b8fbbb1615e963cee56204cc8f12c4609590cfc2f4a5237aee70b43bab7e846",
                "path": "https://s3.us-east-2.amazonaws.com/floyx-beta/post/ae4761b6f8044afa89c50f852b6befa6.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231109/us-east-2/s3/aws4_request&X-Amz-Date=20231109T161153Z&X-Amz-SignedHeaders=host&X-Amz-Signature=e2c6773152ecc9639af0e4f21571ac36a370557bd89f9e6bea7396d334ab4761"
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
                "thumbnailPath": "https://s3.us-east-2.amazonaws.com/floyx-beta/post/c4e4858dec2a4dd9a1881ef6e31534ab.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231109/us-east-2/s3/aws4_request&X-Amz-Date=20231109T161153Z&X-Amz-SignedHeaders=host&X-Amz-Signature=d532230e248f6b32c0e776381ddae3cc696e0183acc34915d5dd892c7109fd6c",
                "path": "https://s3.us-east-2.amazonaws.com/floyx-beta/post/5559db4b08ef4ee19702f6101e8e3a70.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231109/us-east-2/s3/aws4_request&X-Amz-Date=20231109T161153Z&X-Amz-SignedHeaders=host&X-Amz-Signature=df42accc1ddff82f70d40af96ff49e82bfd3431654cc58753fe8c60fb600f790"
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
                "thumbnailPath": "https://s3.us-east-2.amazonaws.com/floyx-beta/post/248059fa0406423ba8828b80ea9bd247.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231109/us-east-2/s3/aws4_request&X-Amz-Date=20231109T161153Z&X-Amz-SignedHeaders=host&X-Amz-Signature=30bc71fb0fdf6cdc5b8e5d89efd7e525eb08afd8a358d21fb9158834d553fc80",
                "path": "https://s3.us-east-2.amazonaws.com/floyx-beta/post/5c0b1bcbdb8a43d78b9c8041a1b37025.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231109/us-east-2/s3/aws4_request&X-Amz-Date=20231109T161153Z&X-Amz-SignedHeaders=host&X-Amz-Signature=6055730b8eea49245d5f8a8e1fdc369976b8956bef078680322dc6fef7999f6f"
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

