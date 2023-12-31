'use client';

import { styled } from '@mui/material/styles';
import { Box, CircularProgress } from '@mui/material';
import { MentionsInput, Mention } from 'react-mentions';
import UserAvatar from '../UserAvatar';
import { useSession } from 'next-auth/react';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';
import {
  useCreateCommentMutation,
  useLazyGetUserSuggestionQuery,
} from '@/lib/redux/slices/comments';
//import { useToast } from '../Toast/useToast';
import MentionItem from '../MentionItem';
import React, { useEffect } from 'react';
import { UserComment } from '@/lib/redux';

const AddCommentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& .avatar': {
    width: 49,
    height: 49,
    marginRight: '20px',
  },
  '& .styled-input-container': {
    display: 'flex',
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .mention-input': {
      display: 'flex',
      width: '90%',
      flexDirection: 'column',
      '& textarea': {
        padding: '0.5rem',
        color: theme.palette.text.primary,
        border: `1px solid ${theme.palette?.primary?.[800]}`,
        borderRadius: '10px',
        paddingLeft: '16px',
        outline: 0,
        '&:hover': {
          border: `1px solid ${theme.palette?.primary.boxBorder}`,
        },
      },
      '& .mention-input-container': {
        width: '100%',
        padding: '0.5rem',
        backgroundColor: theme.palette.background.default,
        borderRadius: '10px',
        outline: 0,
        '& ::placeholder': {
          color: theme.palette.text.primary,
        },
      },
      '& .mention-input-container__suggestions': {
        backgroundColor: `${theme.palette.background.default} !important`,
      },
    },
  },
}));

interface Props {
  id: string;
  commentType: string;
  commentText: string;
  setCommentText: any;
  commentRef: any;
  onCreatedNewComment?: (
    commentData: UserComment | undefined,
    isLoading: boolean
  ) => void;
}
function AddComment({
  id,
  commentRef,
  commentType,
  commentText,
  setCommentText,
  onCreatedNewComment = (isLoading, comment) => {},
}: Props) {
  const session = useSession();
  //const toast = useToast();
  const [createComment, { isLoading, isSuccess, data: createdComment }] =
    useCreateCommentMutation();
  const [getUserSuggestion] = useLazyGetUserSuggestionQuery();
  const handlePostText = (e: any) => {
    const text = e.target.value;
    setCommentText(text);
  };

  const getUserDetails = async (mentionValue: string, callback: any) => {
    let userList: any = [];
    if (mentionValue) {
      const renderSuggestions = await getUserSuggestion(mentionValue);
      if (renderSuggestions && Array.isArray(renderSuggestions?.data)) {
        userList = renderSuggestions?.data;
      }
      callback(userList);
    }
    callback(userList);
  };

  useEffect(() => {
    if (onCreatedNewComment && (isLoading || isSuccess)) {
      onCreatedNewComment(createdComment, isLoading);
    }
  }, [isLoading, isSuccess, createdComment]);

  const onEnterPress = async (e: any) => {
    const addComment = {
      itemId: id,
      type: commentType,
      content: commentText,
    };
    if (e.keyCode === 13 && e.shiftKey === false && commentText.length > 0) {
      await createComment(addComment);
      //toast.success('Comment is added successfully');
      setCommentText('');
    }
  };

  const renderUserSuggestion = (user: any) => {
    return <MentionItem user={user} />;
  };

  return (
    <AddCommentBox>
      <Box gap={1} className="styled-input-container">
        <UserAvatar
          src={`${ApiEndpoint.ProfileDetails}/avatar/${(session as any)?.data
            ?.user?.username}`}
          alt={(session as any)?.data?.user?.username}
          sx={{ width: '49px', height: '49px' }}
        />
        {isLoading && (
          <Box sx={{ position: 'absolute', zIndex: 999, left: '13%' }}>
            <CircularProgress thickness={2} size={30} />
          </Box>
        )}
        <Box className="mention-input">
          <MentionsInput
            inputRef={commentRef}
            className="mention-input-container"
            singleLine={false}
            value={commentText}
            onChange={handlePostText}
            disabled={isLoading}
            onKeyDown={onEnterPress}
            placeholder={'Add a comment'}
          >
            <Mention
              trigger="@"
              displayTransform={(id: string) => `@${id}`}
              data={getUserDetails}
              renderSuggestion={renderUserSuggestion}
              appendSpaceOnAdd={true}
            />
          </MentionsInput>
        </Box>
      </Box>
    </AddCommentBox>
  );
}

export default React.memo(AddComment);
