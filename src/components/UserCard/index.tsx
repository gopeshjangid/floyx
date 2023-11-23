'use client';
import { Avatar, Box, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import DateParser from '../DateParser';
import moment from 'moment';
import CalendarIcon from '@/images/image/calendarIcon';

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
  showDate,
  comment,
}: {
  name: string
  displayPicture?: string
  username: string
  timestamp?: number,
  shared?: any;
  showDate?: any;
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
          {showDate && (
          <Box sx={{display:'flex', alignItems:'center'}}>
            <CalendarIcon />
            {moment(showDate).format('MMM DD, YY')}
          </Box>
        )}
        {comment && <Box><Typography>{comment}</Typography></Box>}
      </Box>
    </UserCardBox>
  )
}
