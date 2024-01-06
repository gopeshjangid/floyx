import { Box, Typography, Button, useTheme } from '@mui/material';
import DateParser from '../DateParser';
import LikeIcon from '@/images/image/likeIcon';
import ReplyIcon from '@/images/image/replyIcon';
import { useLikeItemMutation } from '@/lib/redux';
import { useSession } from 'next-auth/react';
import UserAvatar from '../UserAvatar';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';
import UsernameLink from '../usernameLink';
import React, { useEffect } from 'react';
import { addLinks, formatIndianNumber } from "@/lib/utils";

function Comment({ comment, inputRef, type, onAction, setCommentText }: any) {
  const [updateLike, { data, isSuccess }] = useLikeItemMutation();
  const session = useSession();
  const { palette } = useTheme();

  const commentLikeUnlike = async () => {
    await updateLike({ articleId: comment?.comment?.id, type });
  };

  useEffect(() => {
    if (onAction && isSuccess && data) {
      onAction({ ...data, id: comment?.comment?.id });
    }
  }, [isSuccess, data]);

  const onReply = () => {
    setCommentText(`@[${(session as any)?.data?.user?.username}](${(session as any)?.data?.user?.username})`);
    inputRef.current.focus();
  };

  return (
    <Box sx={{ display: 'flex', marginTop: '30px' }}>
      <Box>
        <UserAvatar
          alt={comment?.user?.name}
          src={`${ApiEndpoint.CurrentUserDetails}/avatar/${comment?.user?.username}`}
          sx={{ width: '50px', height: '50px' }}
        />
      </Box>
      <Box sx={{ width: '100%', marginLeft: '16px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} pb={1}>
          <Box>
            <Typography variant="subtitle1" component={'span'}>
              {comment?.user?.name}{' '}
            </Typography>
            <UsernameLink username={comment?.user?.username} />
          </Box>
          {comment?.comment?.createdDateTime && (
            <Box>
              <DateParser date={comment?.comment?.createdDateTime} />
            </Box>
          )}
        </Box>
        <Box
          sx={{
            width: '100%',
            borderRadius: '10px',
            padding: '4px 12px',
            background: palette.mode == 'dark' ? '#1B1830' : '#fff',
          }}
        >
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'inherit',
              fontSize: '1em',
              color: palette.primary.commentFontColor,
            }}
            dangerouslySetInnerHTML={{
              __html: addLinks(comment?.comment?.content),
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
            <Typography
              component={'span'}
              color={'textPrimary'}
              textTransform={'none'}
              marginBottom={0}
            >
              {formatIndianNumber(comment?.comment?.numberOfLikes)} Like
            </Typography>
          </Button>
          <Button
            variant="text"
            startIcon={<ReplyIcon />}
            onClick={onReply}
            sx={{ marginRight: '25px' }}
          >
            <Typography
              component={'span'}
              color={'textPrimary'}
              textTransform={'none'}
              marginBottom={0}
            >
              Reply
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default React.memo(Comment);
