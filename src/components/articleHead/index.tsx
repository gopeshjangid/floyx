'use client';

import { Box, Tabs, Tab, Typography, Button, Divider, useTheme } from '@mui/material';
import React, { useState, SyntheticEvent } from 'react';
import { styled } from '@mui/material/styles';

import BookMarkIcon from '@/images/image/bookMarkIcon';
import LikeIcon from '@/images/image/likeIcon';
import RecentIcon from '@/images/image/recentIcon';
import ProfileTickIcon from '@/images/image/profileTick';
import PopularIcon from '@/images/image/popularIcon';
import { GradientText } from "../usernameLink";
import { GradientButton } from "../gradientButton";

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
  const [value, setValue] = useState('liked?limited=true');
  const { palette } = useTheme();
  const getColorSvg = () => {
    return (palette?.mode === 'light' ? palette.text.primary : palette?.primary?.main);
  }

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setTabName(newValue);
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
            icon={<PopularIcon fill={value === "liked?limited=true" ? "#A75FFF" : getColorSvg()}/>}
            iconPosition="start"
            value="liked?limited=true"
            label={
              value === "liked?limited=true" ? (
              <GradientText>Popular</GradientText>
              ) : (
                'Popular'
              )
            }
          />
          <Tab
            className="tab"
            icon={<ProfileTickIcon fill={value === "following"  ? "#A75FFF" : getColorSvg()}/>}
            iconPosition="start"
            value="following"
            label={
              value === "following" ? (
              <GradientText>Following</GradientText>
              ) : (
                'Following'
              )
            }
          />
          <Tab
            className="tab"
            icon={<RecentIcon fill={value === "recent"  ? "#A75FFF" : getColorSvg()}/>}
            iconPosition="start"
            value="recent"
            label={value === 'recent' ? (
              <GradientText>Recent</GradientText>
              ) : (
                'Recent'
              )}
          />
          <Tab
            className="tab"
            icon={<BookMarkIcon fill={value === "bookmark"  ? "#A75FFF" : getColorSvg()}/>}
            iconPosition="start"
            value="bookmark"
            label={value === "bookmark" ? (
                <GradientText>Bookmark</GradientText>
              ) : (
                'Bookmark'
              )}
          />
        </Tabs>
        <GradientButton
          variant="outlined"
          color="primary"
          // sx={{ border: '1px solid white' }}
          // target="_blank"
          href="/composer/create"
          isSelected
        >
          <span>
            New Articles
          </span>
        </GradientButton>
      </ArticleHeadContainer>
      <Divider sx={{ color: 'white' }} />
    </>
  );
}
