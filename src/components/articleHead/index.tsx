'use client';

import { Box, Tabs, Tab, Typography, Divider, useTheme } from '@mui/material';
import React, { useState, SyntheticEvent, useEffect } from 'react';
import { styled } from '@mui/material/styles';

import BookMarkIcon from '@/images/image/bookMarkIcon';
import LikeIcon from '@/images/image/likeIcon';
import RecentIcon from '@/images/image/recentIcon';
import ProfileTickIcon from '@/images/image/profileTick';
import PopularIcon from '@/images/image/popularIcon';
import { GradientButton } from '../gradientButton';
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

const defaultTab = [
  {
    label: 'Popular',
    value: 'liked?limited=true',
    icon: (fill: string) => <PopularIcon fill={fill} />,
  },
  {
    label: 'Following',
    value: 'following',
    icon: (fill: string) => <ProfileTickIcon fill={fill} />,
  },
  {
    label: 'Recent',
    value: 'recent',
    icon: (fill: string) => <RecentIcon fill={fill} />,
  },
  {
    label: 'Liked',
    value: 'liked',
    icon: (fill: string) => <LikeIcon fill={fill} />,
  },
  // {
  //   label: "Bookmark",
  //   value: "bookmark",
  //   icon: (fill: string) => <BookMarkIcon fill={fill} />,
  // }
];
export default function ArticleHead({
  setTabName,
  dynamicTab,
  dynamicTabType,
}: any) {
  const [value, setValue] = useState('liked?limited=true');
  const [articleTabs, setArticleTabs] = useState(defaultTab);

  const { palette } = useTheme();
  const getColorSvg = () => {
    return palette?.mode === 'light'
      ? palette.text.primary
      : palette?.primary?.main;
  };

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setTabName(newValue);
  };

  useEffect(() => {
    if (dynamicTabType) {
      setArticleTabs([
        {
          icon: () => <></>,
          label: dynamicTab,
          value: dynamicTabType,
        },
        ...defaultTab,
      ]);
      setValue(dynamicTabType);
      setTabName(dynamicTabType);
    } else {
      setArticleTabs(defaultTab);
      setValue('liked?limited=true');
      setTabName('liked?limited=true');
    }
  }, [dynamicTab]);
  return (
    <>
      <ArticleHeadContainer>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon position tabs example"
        >
          {articleTabs.map((item, index) => (
            <Tab
              key={`articleTab${index}`}
              className="tab"
              icon={
                item?.icon &&
                item?.icon(
                  value === 'liked?limited=true' ? '#A75FFF' : getColorSvg()
                )
              }
              iconPosition="start"
              value={item.value}
              label={
                <Typography variant="subtitle2">
                  {value === item.value ? (
                    <GradientText>{item.label}</GradientText>
                  ) : (
                    item.label
                  )}
                </Typography>
              }
            />
          ))}
        </Tabs>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <GradientButton
            variant="outlined"
            color="primary"
            // sx={{ border: '1px solid white' }}
            // target="_blank"
            href="/composer/create"
            isSelected
          >
            <span>New Articles</span>
          </GradientButton>
        </Box>
      </ArticleHeadContainer>
      <Divider sx={{ color: 'white' }} />
    </>
  );
}
