'use client';

import { Box, Tabs, Tab, Typography, Button, Divider, useTheme } from '@mui/material';
import React, { useState, SyntheticEvent } from 'react';
import { styled } from '@mui/material/styles';

import BookMarkIcon from '@/images/image/bookMarkIcon';
import LikeIcon from '@/images/image/likeIcon';
import RecentIcon from '@/images/image/recentIcon';
import ProfileTickIcon from '@/images/image/profileTick';
import PopularIcon from '@/images/image/popularIcon';
import { GradientButton } from "../gradientButton";
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
            icon={<PopularIcon fill={value === "liked?limited=true" ? "#A75FFF" : getColorSvg()} />}
            iconPosition="start"
            value="liked?limited=true"
            label={
              <Typography variant="subtitle2">
                {value === "liked?limited=true" ? (
                  <GradientText>Popular</GradientText>
                ) : (
                  'Popular'
                )}
              </Typography>
            }

          />
          <Tab
            className="tab"
            icon={<ProfileTickIcon fill={value === "following" ? "#A75FFF" : getColorSvg()} />}
            label={
              <Typography variant="subtitle2">
                {value === 'following' ? (
                  <GradientText>Following</GradientText>
                ) : (
                  'Following'
                )}
              </Typography>
            }

            iconPosition="start"
            value="following"
          />
          <Tab
            className="tab"
            icon={<RecentIcon fill={value === "recent" ? "#A75FFF" : getColorSvg()} />}
            label={
              <Typography variant="subtitle2">
                {value === 'recent' ? (
                  <GradientText>Recent</GradientText>
                ) : (
                  'Recent'
                )}
              </Typography>
            }
            iconPosition="start"
            value="recent"
          />
          <Tab
            className="tab"
            iconPosition="start"
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
