import { Box, Typography, Link, Button } from "@mui/material";
import DateParser from "../DateParser";
import LikeIcon from "@/images/image/likeIcon";
import ReplyIcon from "@/images/image/replyIcon";
import { usePostLikeStatusMutation } from "@/lib/redux";
import { useSession } from "next-auth/react";
import UserAvatar from "../UserAvatar";
import { ApiEndpoint } from "@/lib/API/ApiEndpoints";

export default function Comment({ comment, inputRef, type, setCommentText }: any) {
  const [updateLike] = usePostLikeStatusMutation();
  const session = useSession();

  const commentLikeUnlike = async () => {
    await updateLike({ articleId: comment?.comment?.id, type });
  }

  const onReply = () => {
    setCommentText(`@${(session as any)?.data?.user?.username}`);
    inputRef.current.focus();
  }
  const addLinks = (content: any) => {
    if (!content) {
      return ''
    }
    const profileRegex = /@\[([^\]]+)\]\(([^)]+)\)/gm
    const link = '<a href="/profile/$2">@$2</a>'
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const urlLink = '<a href="$1" target="_blank">$1</a>'
    return content.replace(urlRegex, urlLink).replace(profileRegex, link)
  }

  return (
    <Box sx={{ display: 'flex', marginTop: '30px' }}>
      <Box>
        <UserAvatar
          alt={comment?.user?.name}
          src={`${ApiEndpoint.CurrentUserDetails}/avatar/${comment?.user?.username}`}
          sx={{ width: "50px", height: "50px" }}
        />
      </Box>
      <Box sx={{ width: '100%', marginLeft: '16px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle1" component={'span'}>
              <Link href="#" underline="none">
                {comment?.user?.name}{' '}
              </Link>
              @{comment?.user?.username}
            </Typography>
          </Box>
          {comment?.comment?.createdDateTime && <Box><DateParser date={comment?.comment?.createdDateTime}/></Box>}
        </Box>
        <Box sx={{ width: '100%', marginTop: '15px', border: '1px solid white', borderRadius: '10px', padding: '20px' }}>
          {/* <Typography>{comment?.comment?.content}</Typography> */}
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'inherit',
              fontSize: '1em'
            }}
            dangerouslySetInnerHTML={{
              __html: addLinks(comment?.comment?.content)
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', margin: '20px 0px' }}>
          <Button
            variant="text"
            startIcon={<LikeIcon />}
            sx={{ marginRight: '25px' }}
            onClick={commentLikeUnlike}
          >
            {comment?.comment?.numberOfLikes} Like
          </Button>
          <Button
            variant="text"
            startIcon={<ReplyIcon />}
            onClick={onReply}
            sx={{ marginRight: '25px' }}
          >
            Reply
          </Button>
        </Box>
      </Box>
    </Box>
  )
}