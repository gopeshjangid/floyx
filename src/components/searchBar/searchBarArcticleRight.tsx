'use client';

import { Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Mention, MentionsInput } from 'react-mentions';

export default function SearchBarArcticleRight() {
  function handleArticleSearch(e:any) {
    console.log(e.target.value);
  }

  return (
    <Box>
      <Typography variant="h5">Search for Arcticles</Typography>
      <MentionsInput
        className="mention-input-container"
        singleLine={false}
        //   value={postObj.postText}
        onChange={handleArticleSearch}
        placeholder={'Search articles...'}
        style={{ padding: '10px', display: 'flex', alignItem: 'centre', justifyContent: 'space-between' }}
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
  );
}
