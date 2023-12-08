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
// import { useSession } from "next-auth/react";

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
}: any) {
  // const session = useSession();
  // const userDetail = session.data?.user;

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
    if (username === "sadam_hussain") {
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
        <LikeCommentShare postDetails={postDetails} />
        <CommentList comments={commentList} />
        <AddComment avatar={avatar}/>
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
