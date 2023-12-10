'use client';

import React from 'react';
import { Box, Button, Typography, Tabs, Tab } from '@mui/material';

export default function AddArticleHead({ setSaveDraft, articleDraftNumbers, value, setValue }) {

  const handleSaveDraft = () => {
    setSaveDraft(true);
  };

  const handlePageChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Box
      sx={{
        width: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid white',
        borderRadius: '5px',
        padding: '0px 0px 0px 15px ',
      }}
    >
      <Box sx={{ display: 'flex' }} >
        <Box sx={{ borderRight: '1px solid white', marginRight: '20px' }}>
          <Typography variant="subtitle1" sx={{ padding: '15px 20px 0 0' }}>
            Article Editor
          </Typography>
        </Box>
        <Tabs
          value={value}
          onChange={handlePageChange}
          aria-label="icon position tabs example"
        >
          <Tab
            className="tab"
            label={<Typography variant="subtitle2">My Articles [{articleDraftNumbers?.info?.numberOfArticles}]</Typography>}
            value={'myArticles'}
            sx={{ paddingTop: '17px' }}
          />
          <Tab
            className="tab"
            label={<Typography variant="subtitle2">My Drafts [{articleDraftNumbers?.info?.numberOfDrafts}]</Typography>}
            value={'myDrafts'}
            sx={{ paddingTop: '17px' }}

          />
          <Tab
            className="tab"
            label={<Typography variant="subtitle2">Write New</Typography>}
            value={'newArticle'}
            sx={{ paddingTop: '17px' }}
          />
        </Tabs>
      </Box>
      {value === 'newArticle' && <Box>
        <Button variant="outlined" sx={{ marginRight: '10px', borderRadius: '10px', paddingX: '20px' }} onClick={handleSaveDraft}>
          Save as Draft
        </Button>
        <Button variant="outlined" sx={{ marginRight: '10px', borderRadius: '10px', paddingX: '20px' }}>
          Publish
        </Button>
      </Box>}
    </Box>
  );
}
