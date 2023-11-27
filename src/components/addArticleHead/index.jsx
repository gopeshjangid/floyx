'use client';

import React, { SyntheticEvent } from 'react';
import { Box, Button, Typography } from '@mui/material';

export default function AddArticleHead({ setSaveDraft }) {
  const handleSaveDraft = () => {
    setSaveDraft(true);
  };
  return (
    <Box
      sx={{
        width: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid white',
        borderRadius: '5px',
        padding: '10px 0px 10px 20px ',
      }}
    >
      <Box sx={{ display: 'flex' }} >
        <Box sx={{ borderRight: '1px solid white', marginRight: '20px' }}>
          <Typography variant="subtitle1" sx={{ padding: '10px 20px 0 0' }}>
            Article Editor
          </Typography>
        </Box>
        <Button variant="text" sx={{ marginRight: '20px' }}>
          <Typography variant="button">My Articles</Typography>
        </Button>
        <Button variant="text" sx={{ marginRight: '20px' }}>
          <Typography variant="button">My Drafts</Typography>
        </Button>
        <Button variant="text" sx={{ marginRight: '20px' }}>
          <Typography variant="button">Write New</Typography>
        </Button>
      </Box>
      <Box>
        <Button variant="outlined" sx={{ marginRight: '10px', borderRadius: '10px', paddingX: '20px' }} onClick={handleSaveDraft}>
          Save as Draft
        </Button>
        <Button variant="outlined" sx={{ marginRight: '10px', borderRadius: '10px', paddingX: '20px' }}>
          Publish
        </Button>
      </Box>
    </Box>
  );
}
