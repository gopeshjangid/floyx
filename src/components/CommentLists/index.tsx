import { Box } from "@mui/material";
import UserCard from "../UserCard";

export default function CommentList({comments}: any) {
  return (
    <>
      {comments && comments.map((val: any, index: number) => (<Box key={`userCard${index}`}>
        <UserCard
          name={val?.user?.name}
          username={val?.user?.username}
          timestamp={val?.user?.postTime}
          comment={val?.comment?.content}
        />
      </Box>))}
    </>
  )
}