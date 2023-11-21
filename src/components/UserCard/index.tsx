"use client";

import { Avatar, Box, Link, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import DateParser from "../DateParser"

export const UserCardBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "20px 0px",
  "& .display-flex": {
    display: "flex",
    alignItems: "center"
  }
}))

export default function UserCard({
  name,
  displayPicture,
  username,
  timestamp,
  shared,
  comment,
}: {
  name: string
  displayPicture?: string
  username: string
  timestamp: number,
  shared?: any;
  comment?: string,
}) {
  return (
    <UserCardBox>
      <Box>
        <Avatar
          alt={name}
          src={displayPicture}
          sx={{ width: 50, height: 50, marginRight: "10px" }}
        />
      </Box>
      <Box>
        <Box className="display-flex">
          <Typography variant="subtitle1" component={"span"}>
            <Link href="#" underline="none" >{name}</Link>
            {` @${username} ${shared ? " shared a " : ""}`}
            {shared && <Link href="#" underline="none" >post</Link>}
          </Typography>
          </Box>
        {timestamp &&
          <Box>
            <DateParser date={timestamp} />
          </Box>}
        {comment && <Box><Typography>{comment}</Typography></Box>}
      </Box>
    </UserCardBox>
  )
}
