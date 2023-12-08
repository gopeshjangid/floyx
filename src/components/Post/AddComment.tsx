'use client';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { MentionsInput, Mention } from 'react-mentions';
import { useState } from 'react';
import UserAvatar from "../UserAvatar";
import { useSession } from "next-auth/react";
import { ApiEndpoint } from "@/lib/API/ApiEndpoints";
import { useCreateCommentMutation } from "@/lib/redux/slices/comments";
import { useToast } from "../Toast/useToast";

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
  "& .styled-input-container": {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    "& .mention-input": {
      display: "flex",
      width: "90%",
      flexDirection: "column",
        "& textarea": {
          padding: "0.5rem",
          color: theme.palette.text.primary,
          borderRadius: '10px',
        },
        "& .mention-input-container": {
          width: "100%",
          padding: "0.5rem",
          backgroundColor: theme.palette.background.default,
          borderRadius: '10px',
        }
      },
  },
}));

interface Props {
  id: string;
  commentType: string;
}
export default function AddComment({id, commentType}:Props) {
  const session = useSession();
  const toast = useToast();
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const [commentText, setCommentText] = useState('');

  const handlePostText = (e: any) => {
    const text = e.target.value;
    setCommentText( text);
  };

  const onEnterPress = async (e: any) => {
    const addComment = {
      itemId: id,
      type: commentType,
      content: commentText
    }
    if (e.keyCode === 13 && e.shiftKey === false && commentText.length > 0) {
      await createComment(addComment);
      toast.success('Comment is added successfully');
      setCommentText('');
    }
  }

  return (
    <AddCommentBox>
      <Box className="styled-input-container">
        <UserAvatar
          src={`${ApiEndpoint.ProfileDetails}/avatar/${(session as any)?.data?.user?.username}`}
          alt={(session as any)?.data?.user?.username}
          sx={{ width: '49px', height: '49px' }}
        />
        <Box className="mention-input">
          <MentionsInput
            className="mention-input-container"
            singleLine={false}
            value={commentText}
            onChange={handlePostText}
            disabled={isLoading}
            onKeyDown={onEnterPress}
            placeholder={"Add a comment"}
          >
          <Mention
            trigger="@"
            displayTransform={(id: string) => `@${id}`}
            data={[]}
            // renderSuggestion={[]}
            appendSpaceOnAdd={true}
          />
        </MentionsInput>
        </Box>
      </Box>
    </AddCommentBox>
  );
}
