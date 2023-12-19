'use client';

import React from 'react';
import {
  Button,
  Typography,
  Tabs,
  Tab,
  Stack,
  useTheme,
} from '@mui/material';

export default function AddArticleHead({
  setSaveDraft,
  setIsPublish,
  articleDraftNumbers,
  value,
  setValue,
  isDisabled,
  isPublished,
  setIsReset,
  setIsEditing,
  setArticleId,
}) {

  const { palette } = useTheme();

  const handleSaveDraft = () => {
    setSaveDraft(true);
    setIsPublish(false);
  };

  const handlePublish = () => {
    setIsPublish(true);
    setSaveDraft(false);
  }
  const handlePageChange = (event, newValue) => {
    setIsReset(true);
    setIsEditing(false);
    setArticleId(undefined);
    setValue(newValue);
  }

  return (
    <Stack
      direction="row"
      gap={1}
      justifyContent="space-between"
      mb={2}
      sx={{ borderBottom: `1px solid ${palette.action.border}` }}
    >
      <Stack>
        <Tabs
          value={value}
          onChange={handlePageChange}
          aria-label="icon position tabs example"
        >
          <Tab
            className="tab"
            label={<Typography variant="subtitle2">My Articles [{articleDraftNumbers?.info?.numberOfArticles}]</Typography>}
            value={'my'}
            sx={{ paddingTop: '16px' }}
          />
          <Tab
            className="tab"
            label={<Typography variant="subtitle2">My Drafts [{articleDraftNumbers?.info?.numberOfDrafts}]</Typography>}
            value={'draft'}
            sx={{ paddingTop: '16px' }}
          />
          <Tab
            className="tab"
            label={<Typography variant="subtitle2">Write New</Typography>}
            value={'newArticle'}
            sx={{ paddingTop: '16px' }}
          />
        </Tabs>
      </Stack>
      {value === 'newArticle' && (
        <Stack direction="row" gap={1} alignItems={"flex-start"}>
          <Button
            variant="outlined"
            sx={{ borderRadius: '10px' }}
            onClick={handleSaveDraft}
            disabled={isDisabled}
          >
            Save as Draft
          </Button>
          <Button
            variant="outlined"
            sx={{ borderRadius: '10px' }}
            onClick={handlePublish}
            disabled={isDisabled}
          >
            {isPublished ? "Save Edit" : "Publish"}
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
