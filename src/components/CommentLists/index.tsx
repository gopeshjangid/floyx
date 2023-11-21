import { Box, Typography } from "@mui/material";
import UserCard from "../UserCard";

export default function CommentList({comments}: any) {
  return (
    <>
      {comments && comments.map((val: any) => (<Box>
        <UserCard
          name={val?.user?.name}
          username={val?.user?.username}
          timestamp={val?.user?.postTime}
          displayPicture={val?.user?.displayPicture} 
          comment={val?.comment?.content}
        />
        {/* <Typography>{val?.comment?.content}</Typography> */}
      </Box>))}
    </>
  )
}