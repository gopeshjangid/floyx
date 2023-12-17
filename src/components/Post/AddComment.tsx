'use client';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { MentionsInput, Mention } from 'react-mentions';
import UserAvatar from '../UserAvatar';
import { useSession } from 'next-auth/react';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';
import { useCreateCommentMutation, useLazyGetUserSuggestionQuery } from '@/lib/redux/slices/comments';
import { useToast } from '../Toast/useToast';
import MentionItem from '../MentionItem';

const AddCommentBox = styled(Box)(({ theme }) => ({
  marginTop: '20px',
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
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .mention-input': {
      display: 'flex',
      width: '90%',
      flexDirection: 'column',
      '& textarea': {
        padding: '0.5rem',
        color: theme.palette.text.primary,
        borderRadius: '10px',
      },
      '& .mention-input-container': {
        width: '100%',
        padding: '0.5rem',
        backgroundColor: theme.palette.background.default,
        borderRadius: '10px',
      },
      '& .mention-input-container__suggestions': {
        backgroundColor: `${ theme.palette.background.default } !important`,
      }
    },
  },
}));

interface Props {
  id: string;
  commentType: string;
  commentText: string;
  setCommentText: any;
  commentRef: any;
}
export default function AddComment({
  id,
  commentRef,
  commentType,
  commentText,
  setCommentText,
}: Props) {
  const session = useSession();
  const toast = useToast();
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const [getUserSuggestion ] = useLazyGetUserSuggestionQuery();
  const handlePostText = (e: any) => {
    const text = e.target.value;
    setCommentText(text);
  };

  const getUserDetails = async (mentionValue: string, callback: any) => {
    let userList: any = [];
    if (mentionValue) {
      const renderSuggestions = await getUserSuggestion(mentionValue);
      if (renderSuggestions && Array.isArray(renderSuggestions?.data)) {
        console.log(renderSuggestions.data);
        userList = renderSuggestions?.data;
      }
      callback(userList);
    }
    callback(userList);
  }

  const onEnterPress = async (e: any) => {
    const addComment = {
      itemId: id,
      type: commentType,
      content: commentText,
    };
    if (e.keyCode === 13 && e.shiftKey === false && commentText.length > 0) {
      await createComment(addComment);
      toast.success('Comment is added successfully');
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
