'use client';

import React from 'react';
import { Button, Typography, Tabs, Tab, Stack, useTheme, styled } from '@mui/material';
import { GradientText } from '../usernameLink';
import DocumentText from '@/assets/images/svg/documentText';
import EditIcon from '@/assets/images/svg/editIcon';
import { GradientButton } from '../gradientButton';
import AddIcon from '@/assets/images/svg/addIcon';

const StyledTypography = styled(Typography)({
  marginTop: '4px',
});


function AddArticleHead({
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
  };
  const handlePageChange = (event, newValue) => {
    setIsReset(true);
    setIsEditing(false);
    setArticleId(undefined);
    setValue(newValue);
  };

  return (
    <Stack
      direction="row"
      gap={1}
      justifyContent="space-between"
      mb={2}
      flexWrap="wrap-reverse"
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
            iconPosition="start"
            icon={
              <DocumentText
                color={
                  value === 'my'
                    ? palette.primary.iconSelectedColor
                    : palette?.action?.svg
                }
              />
            }
            label={
              value === 'my' ? (
                <GradientText>
                  My Articles [{articleDraftNumbers?.info?.numberOfArticles}]
                </GradientText>
              ) : (
                <StyledTypography variant="subtitle2">
                  My Articles [{articleDraftNumbers?.info?.numberOfArticles}]
                </StyledTypography>
              )
            }
            value={'my'}
            sx={{ paddingTop: '16px' }}
          />
          <Tab
            className="tab"
            iconPosition="start"
            icon={
              <EditIcon
                color={
                  value === 'draft'
                    ? palette.primary.iconSelectedColor
                    : palette?.action?.svg
                }
              />
            }
            label={
              value === 'draft' ? (
                <GradientText>
                  My Drafts [{articleDraftNumbers?.info?.numberOfDrafts}]
                </GradientText>
              ) : (
                <StyledTypography variant="subtitle2">
                  My Drafts [{articleDraftNumbers?.info?.numberOfDrafts}]
                </StyledTypography>
              )
            }
            value={'draft'}
            sx={{ paddingTop: '16px' }}
          />
          <Tab
            className="tab"
            iconPosition="start"
            icon={
              <AddIcon
                color={
                  value === 'newArticle'
                    ? palette.primary.iconSelectedColor
                    : palette?.action?.svg
                }
              />
            }
            label={
              value === 'newArticle' ? (
                <GradientText>Write New</GradientText>
              ) : (
                <StyledTypography variant="subtitle2">Write New</StyledTypography>
              )
            }
            value={'newArticle'}
            sx={{ paddingTop: '16px' }}
          />
        </Tabs>
      </Stack>
      {value === 'newArticle' && (
        <Stack direction="row" gap={1} alignItems={'flex-end'} marginBottom={1}>
          <GradientButton
            variant="outlined"
            onClick={handleSaveDraft}
            disabled={isDisabled}
            isSelected
          >
            <span>Save as Draft</span>
          </GradientButton>
          <Button
            variant="contained"
            sx={{ borderRadius: '10px' }}
            onClick={handlePublish}
            disabled={isDisabled}
          >
            {isPublished ? 'Save Edit' : 'Publish'}
          </Button>
        </Stack>
      )}
    </Stack>
  );
}

export default React.memo(AddArticleHead);
