'use client';

import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  IconButton,
} from '@mui/material';
import { MentionsInput, Mention } from 'react-mentions';
import UserAvatar from '../UserAvatar';
import { useSession } from 'next-auth/react';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';
import {
  useCreateCommentMutation,
  useLazyGetUserSuggestionQuery,
  useUpdateCommentMutation,
} from '@/lib/redux/slices/comments';
//import { useToast } from '../Toast/useToast';
import MentionItem from '../MentionItem';
import React, { useEffect, useRef, useState } from 'react';
import { UserComment } from '@/lib/redux';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import MoodIcon from '@mui/icons-material/Mood';
import { useTranslation } from 'react-i18next';

const AddCommentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  flexDirection: 'column',
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
        color: theme.palette.primary.fontLightColor,
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
  commentType?: string;
  commentText: string;
  setCommentText: any;
  commentRef: any;
  onCreatedNewComment?: (
    commentData: UserComment | undefined,
    isLoading: boolean
  ) => void;
  commentAction?: (comment: any) => void;
  isEditing?: boolean;
  setIsEditing?: any;
  isNewComment?: boolean;
}
function AddComment({
  id,
  commentRef,
  commentType,
  commentText,
  setCommentText,
  onCreatedNewComment = (comment, isLoading) => {},
  commentAction = comment => {},
  isEditing,
  setIsEditing,
  isNewComment,
}: Props) {
  const session = useSession();
  const { t } = useTranslation();
  const triggerRef = useRef<HTMLButtonElement>(null); // Reference to the button or element that triggers the picker
  const pickerRef = useRef(null); // Reference to the emoji picker element
  const [createComment, { isLoading, isSuccess, data: createdComment }] =
    useCreateCommentMutation();
  const [getUserSuggestion] = useLazyGetUserSuggestionQuery();
  const [updateComment, { isLoading: updateLoading }] =
    useUpdateCommentMutation();
  const handlePostText = (e: any, emoji?: any) => {
    let text = '';
    if (e && e.target) {
      text = e.target.value;
    } else if (emoji) {
      text = `${commentText}${emoji.native}`;
    }
    setCommentText(text);
  };
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    adjustPickerPosition();
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
      if (!isEditing) {
        await createComment(addComment);
        setCommentText('');
      }
    }
    setIsVisible(false);
  };

  const handleEditSubmit = async () => {
    const data = await updateComment({
      commentId: id,
      content: commentText,
      isNewComment: isNewComment,
    });
    commentAction({ id: id, content: commentText, isDeleted: true });
    setIsEditing(false);
  };

  
  const [pickerStyle, setPickerStyle] = useState({});


  const adjustPickerPosition = () => {
    if (triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - triggerRect.bottom;

      // Adjust this threshold as needed
      const neededSpace = 355; // Approximate height of the picker

      if (spaceBelow < neededSpace) {
        // Not enough space below, show above
        setPickerStyle({
          position: 'absolute',
          top: `-${neededSpace+77}px`
        });
      } else {
        // Enough space below, show below
        setPickerStyle({
          position: 'absolute',
          top: `${40}px`,
        });
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', adjustPickerPosition);
    return () => {
      window.removeEventListener('resize', adjustPickerPosition);
    };
  }, []);

  const renderUserSuggestion = (user: any) => {
    return <MentionItem user={user} />;
  };
  
  return (
    <AddCommentBox>
      <Box gap={1} className="styled-input-container">
        <UserAvatar
          src={`${ApiEndpoint.ProfileDetails}/avatar/${
            (session as any)?.data?.user?.username
          }`}
          alt={(session as any)?.data?.user?.username}
          sx={{ width: '45px', height: '45px' }}
        />
        {(isLoading || updateLoading) && (
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
            style={{ width: '95%' }}
          >
            <Mention
              trigger="@"
              displayTransform={(id: string) => `@${id}`}
              data={getUserDetails}
              renderSuggestion={renderUserSuggestion}
              appendSpaceOnAdd={true}
            />
          </MentionsInput>
          <IconButton
            onClick={toggleVisibility}
            ref={triggerRef}
            sx={{ position: 'absolute', right: '-10px' }}
          >
            <MoodIcon />
          </IconButton>
          <Box
            sx={{
              position: 'absolute',
              zIndex: 999999,
              right: '-10px',
              top: '50px',
              ...pickerStyle
            }}
            ref={pickerRef}
          >
            {isVisible ? (
              <Picker
                data={data}
                onEmojiSelect={emoji => handlePostText(null, emoji)}
                onClickOutside={()=>setIsVisible(false)}

              />
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
      {isEditing && (
        <Stack
          direction={'row'}
          justifyContent={'flex-end'}
          gap={1}
          marginTop={1}
        >
          <Button translate="no" variant="outlined" onClick={handleEditSubmit}>
            {t('comp.comment.update')}
          </Button>
          <Button
            translate="no"
            variant="outlined"
            onClick={() => setIsEditing(false)}
          >
            {t('comp.comment.deleteCancel')}
          </Button>
        </Stack>
      )}
    </AddCommentBox>
  );
}

export default React.memo(AddComment);
