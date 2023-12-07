"use client";

import { Box, Typography } from "@mui/material";

import UserCard from "../UserCard"
import { PostBox } from "./styledPostBox"
import SplitButton from "../SplitButton"
import PostImage from "./PostImage"
import LikeCommentShare from "./LikeCommentShare"
import AddComment from "./AddComment"
import CommentList from "../CommentLists"
import { useEffect, useState } from "react";
import PostActionModal from "./PostActionModal";
import { useRouter } from "next/navigation";
import { allRoutes } from "@/constants/allRoutes";
import { ArticleComments } from "@/lib/redux/slices/articleDetails";
import { Post as PostDetail } from "@/lib/redux";
import { useSession } from "next-auth/react";
import LikesComments from "../fullArticle/likesComments";
// import { useSession } from "next-auth/react";
interface postDetail {
  name: string;
  username: string;
  createdDateTime: number;
  content: string;
  shared: null | string;
  image:  {
    thumbnailPath: string;
    path: string;
  };
  link: null | string;
  isShared?: boolean;
  postDetails?: PostDetail;
  avatar:string;
  postId:string;
  commentList?: ArticleComments[],
}

export default function Post({
  name,
  username,
  createdDateTime,
  content,
  shared,
  image,
  link,
  isShared,
  postDetails,
  avatar,
  postId,
  commentList,
}: postDetail) {
  const session = useSession();
  const userDetail = (session as any)?.data?.user?.username;

  const router = useRouter();
  const [buttonOptions, setButtonOptions] = useState(["Direct Link"]);
  const [buttonAction, setButtonAction] = useState('');
  const [open, setOpen] = useState<boolean>(false);

  const handleOptions = (val: any, options: Array<string>) => {
    setButtonAction(options[val]);
    if (options[val] === "Delete Post") {
      setOpen(true);
    } else if (options[val] === "Direct Link") {
      router.push(`${allRoutes.post}/${postId}`)
    }
  }

  useEffect(() => {
    if (username === userDetail) {
      setButtonOptions(["Delete Post", "Direct Link"])
    }
  }, [username]);  

  return (
    <PostBox>
      <Box sx={{ margin: "0rem 1rem 1rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <UserCard
            name={name}
            username={username}
            timestamp={createdDateTime}
            shared={shared}
          />
          <Box sx={{padding: '20px 0'}}>
            <SplitButton 
              options={buttonOptions}
              handleOptions={(event:any) => handleOptions(event, buttonOptions)}
            />
          </Box>
        </Box>
        <Box>
          <Typography variant="h6">
            {content}
          </Typography>
        </Box>
        <PostImage image={image} link={link} shared={shared} isShared={isShared} postId={postId} />
        {/* <LikeCommentShare postDetails={postDetails} /> */}
        <LikesComments
          likesCommentsDetails={postDetails}
          avatar={avatar}
          articleId={postId}
          isPost={true}
          isShared={isShared}
        />
        {!isShared && <CommentList comments={commentList} />}
        {/* {!isShared && <AddComment avatar={avatar} />} */}
      </Box>
      <PostActionModal
        open={open}
        setOpen={setOpen}
        action={buttonAction}
        postId={postId}
      />
    </PostBox>
  )
}
