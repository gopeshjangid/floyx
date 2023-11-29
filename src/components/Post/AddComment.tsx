'use client';

import { styled } from '@mui/material/styles';
import { Box, Avatar } from '@mui/material';
import { MentionsInput, Mention } from 'react-mentions';
import { useState } from 'react';

const AddCommentBox = styled(Box)(() => ({
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
  '& .comment-box': {
    width: '100%',
    borderRadius: '5px',
  },
}));

export default function AddComment({ avatar }: any) {
  const isAuthorizedUser =false;
  const [postObj, setPostObj] = useState({
    postText: '',
    postTextLeft: 280,
    publishButtonDisabled: false,
  });

  const handlePostText = (
    e: any,
    newValue: any,
    newPlainTextValue: any,
  ) => {
    const text = e.target.value;

    setPostObj({
      postText: text,
      postTextLeft: 280 - calulcateLength(newPlainTextValue),
      publishButtonDisabled: !isAuthorizedUser
        ? true
        : 280 - calulcateLength(newPlainTextValue) < 0,
    });
  };

  const calulcateLength = (str: string) => {
    const output = str.replace(
      /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g,
      ''
    );
    const total = fancyCount(str) - fancyCount(output) + fancyCount(output);
    return total;
  };

  const fancyCount = (str: any) => {
    return Array.from(str.split(/[\ufe00-\ufe0f]/).join('')).length;
  };

  return (
    <AddCommentBox>
      <Box>
        <Avatar src={avatar} className="avatar" />
      </Box>
      <Box className="comment-box">
        <MentionsInput
          className="mention-input-container"
          singleLine={false}
          value={postObj.postText}
          onChange={handlePostText}
          placeholder={'Add a comment...'}
          style={{padding:'10px', display:'flex', alignItem:'centre', justifyContent:'space-between'}}
        >
          <Mention
            trigger="@"
            // displayTransform={(id: string) => `@${id}`}
            data={[]}
            // renderSuggestion={[]}
            appendSpaceOnAdd={true}
          />
        </MentionsInput>
      </Box>
    </AddCommentBox>
  );
}
