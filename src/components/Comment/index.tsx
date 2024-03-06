import { Box, Typography, Button, useTheme, Stack } from '@mui/material';
import DateParser from '../DateParser';
import LikeIcon from '@/images/image/likeIcon';
import ReplyIcon from '@/images/image/replyIcon';
import { useLikeItemMutation } from '@/lib/redux';
import { useSession } from 'next-auth/react';
import UserAvatar from '../UserAvatar';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';
import UsernameLink, { ProfileName } from '../usernameLink';
import React, { useEffect, useRef, useState } from 'react';
import { addLinks, formatIndianNumber } from '@/lib/utils';
import SplitButton from '../SplitButton';
import AddComment from '../Post/AddComment';
import DeleteComment from './DeleteComment';
import { useTranslation } from 'react-i18next';

function Comment({
  comment,
  inputRef,
  type,
  onAction,
  setCommentText,
  isNewComment,
}: any) {
  const [updateLike, { data, isSuccess }] = useLikeItemMutation();
  const session = useSession();
  const updateCommentRef = useRef();
const {t}=useTranslation()
  const [isEditing, setIsEditing] = useState(false);
  const { palette } = useTheme();
  const userName = (session as any)?.data?.user?.username;
  const commentAction = [t('comp.comment.editComment'), t('comp.comment.deleteComment')];
  const [updateComment, setUpdateComment] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const commentLikeUnlike = async () => {
    await updateLike({ articleId: comment?.comment?.id, type });
  };

  const onReply = (commentUserName: string) => {
    setCommentText(`@[${commentUserName}](${commentUserName}) `);
    inputRef.current.focus();
  };

  const handleOptions = (index: number) => {
    if (commentAction[index] === t('comp.comment.editComment')) {
      setIsEditing(true);
      setUpdateComment(comment?.comment?.content);
    } else {
      setOpen(true);
    }
  };
  useEffect(() => {
    if (onAction && isSuccess && data) {
      onAction({ ...data, id: comment?.comment?.id });
    }
  }, [isSuccess, data]);

  return (
    <Box sx={{ display: 'flex', marginTop: '30px' }}>
      {!isEditing && (
        <>
          <Box>
            <UserAvatar
              alt={comment?.user?.name}
              src={`${ApiEndpoint.CurrentUserDetails}/avatar/${comment?.user?.username}`}
              sx={{ width: '50px', height: '50px' }}
            />
          </Box>
          <Box sx={{ width: '100%', marginLeft: '16px' }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between' }}
              pb={1}
            >
              <Box>
                <ProfileName variant="subtitle1">
                  {comment?.user?.name}{' '}
                </ProfileName>
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
            <Stack direction="row" justifyContent={'space-between'}>
              <Box sx={{ display: 'flex', margin: '20px 0px' }}>
                <Button
                  variant="text"
                  startIcon={<LikeIcon isLiked={formatIndianNumber(comment?.comment?.numberOfLikes)} />}
                  sx={{ marginRight: '25px' }}
                  onClick={commentLikeUnlike}
                >
                  <Typography translate="no"
                    component={'span'}
                    color={'textPrimary'}
                    textTransform={'none'}
                    marginBottom={0}
                  >
                    {formatIndianNumber(comment?.comment?.numberOfLikes)}{t('comp.comment.like')}
                  </Typography>
                </Button>
                <Button
                  variant="text"
                  startIcon={<ReplyIcon />}
                  onClick={() => {
                    onReply(comment?.user?.username);
                  }}
                  sx={{ marginRight: '25px' }}
                >
                  <Typography
                  translate="no"
                    component={'span'}
                    color={'textPrimary'}
                    textTransform={'none'}
                    marginBottom={0}
                  >
                    {t('comp.comment.reply')}
                  
                  </Typography>
                </Button>
              </Box>
              {userName === comment?.user?.username && (
                <SplitButton
                  options={commentAction}
                  handleOptions={(event: number) => handleOptions(event)}
                />
              )}
            </Stack>
          </Box>
        </>
      )}
      {isEditing && (
        <AddComment
          id={comment?.comment?.id}
          commentRef={updateCommentRef}
          commentText={updateComment}
          setCommentText={setUpdateComment}
          isEditing={true}
          setIsEditing={setIsEditing}
          isNewComment={isNewComment}
          commentAction={onAction}
        />
      )}
      <DeleteComment
        open={open}
        setOpen={setOpen}
        commentId={comment?.comment?.id}
        commentType={type}
        onAction={onAction}
      />
    </Box>
  );
}

export default React.memo(Comment);
