import { Avatar, Box, Typography, Link, Button } from "@mui/material";
import DateParser from "../DateParser";
import LikeIcon from "@/images/image/likeIcon";
import ReplyIcon from "@/images/image/replyIcon";

export default function Comment({ comment }: any) {
  return (
    <Box sx={{ display: 'flex', marginTop: '30px' }}>
      <Box>
        <Avatar alt={comment?.user?.name} src={comment?.user} sx={{ width: 60, height: 60, marginRight: '10px' }} />
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle1" component={'span'}>
              <Link href="#" underline="none">
                {comment?.user?.name}{' '}
              </Link>
              @{comment?.user?.username}
            </Typography>
          </Box>
          <Box>{DateParser(comment?.comment?.createdDateTime)}</Box>
        </Box>
        <Box sx={{ width: '100%', marginTop: '15px', border: '1px solid white', borderRadius: '10px', padding: '20px' }}>
          <Typography>{comment?.comment?.content}</Typography>
        </Box>
        <Box sx={{ display: 'flex', margin: '20px 0px' }}>
          <Button variant="text" startIcon={<LikeIcon />} sx={{ marginRight: '25px' }} >
            {comment?.comment?.numberOfLikes} Like
          </Button>
          <Button variant="text" startIcon={<ReplyIcon />} sx={{ marginRight: '25px' }}>
            Reply
          </Button>
        </Box>
      </Box>
    </Box>
  )
}