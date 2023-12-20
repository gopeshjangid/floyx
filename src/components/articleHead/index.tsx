'use client';

import { Box, Tabs, Tab, Typography, Button, Divider } from '@mui/material';
import React, { useState, SyntheticEvent } from 'react';
import { styled } from '@mui/material/styles';

import BookMarkIcon from '@/images/image/bookMarkIcon';
import LikeIcon from '@/images/image/likeIcon';
import RecentIcon from '@/images/image/recentIcon';
import ProfileTickIcon from '@/images/image/profileTick';
import PopularIcon from '@/images/image/popularIcon';
import { GradientText } from '../GradientComponents';

const ArticleHeadContainer = styled(Box)(() => ({
  display: 'flex',
  marginTop: '15px',
  alignItems: 'center',
  justifyContent: 'space-between',
  '& .tab': {
    svg: {
      marginRight: '5px',
    },
    h6: {
      margin: 0,
    },
  },
}));

export default function ArticleHead({ setTabName }: any) {
  const [value, setValue] = useState('popular');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (newValue === 'popular') {
      setTabName('liked?limited=true');
    } else {
      setTabName(newValue);
    }
  };

  return (
    <>
      <ArticleHeadContainer>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon position tabs example"
        >
          <Tab
            className="tab"
            label={
              <Typography variant="subtitle2">
                {value === 'popular' ? (
                  <GradientText>Popular</GradientText>
                ) : (
                  'Popular'
                )}
              </Typography>
            }
            icon={<PopularIcon />}
            iconPosition="start"
            value={'popular'}
          />
          <Tab
            className="tab"
            label={
              <Typography variant="subtitle2">
                {value === 'following' ? (
                  <GradientText>Following</GradientText>
                ) : (
                  'Following'
                )}
              </Typography>
            }
            icon={<ProfileTickIcon />}
            iconPosition="start"
            value={'following'}
          />
          <Tab
            className="tab"
            label={
              <Typography variant="subtitle2">
                {value === 'recent' ? (
                  <GradientText>Recent</GradientText>
                ) : (
                  'Recent'
                )}
              </Typography>
            }
            icon={<RecentIcon />}
            iconPosition="start"
            value={'recent'}
          />
          <Tab
            className="tab"
            label={
              <Typography variant="subtitle2">
                {value === 'liked' ? (
                  <GradientText>Liked</GradientText>
                ) : (
                  'Liked'
                )}
              </Typography>
            }
            icon={<LikeIcon />}
            iconPosition="start"
            value={'liked'}
          />
          <Tab
            className="tab"
            label={
              <Typography variant="subtitle2">
                {value === 'bookmark' ? (
                  <GradientText>Bookmark</GradientText>
                ) : (
                  'Bookmark'
                )}
              </Typography>
            }
            icon={<BookMarkIcon />}
            iconPosition="start"
            value={'bookmark'}
          />
        </Tabs>
        <Button
          variant="outlined"
          color="primary"
          sx={{ border: '1px solid white' }}
          target="_blank"
          href="/composer/create"
        >
          <GradientText> New Articles</GradientText>
        </Button>
      </ArticleHeadContainer>
      <Divider sx={{ color: 'white' }} />
    </>
  );
}
