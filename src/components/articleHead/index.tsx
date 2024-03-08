'use client';

import { Box, Tabs, Tab, Typography, Divider, useTheme } from '@mui/material';
import React, { useState, SyntheticEvent, useEffect } from 'react';
import { styled } from '@mui/material/styles';

import LikeIcon from '@/images/image/likeIcon';
import RecentIcon from '@/images/image/recentIcon';
import ProfileTickIcon from '@/images/image/profileTick';
import PopularIcon from '@/images/image/popularIcon';
import { GradientButton } from '../gradientButton';
import { GradientText } from '../GradientComponents';
import Link from 'next/link';
import SearchIcon from '@/assets/images/svg/search';
import { useTranslation } from 'react-i18next';

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


export default function ArticleHead({
  setTabName,
  dynamicTab,
  dynamicTabType,
  setDynamicTab
}: any) {

  const { t } = useTranslation()
  const defaultTab = [
    {
      label: t("comp.addArticleHead.popular"),
      value: 'popular',
      icon: (fill: string) => <PopularIcon fill={fill} />,
    },
    {
      label: t("comp.addArticleHead.following"),
      value: 'following',
      icon: (fill: string) => <ProfileTickIcon fill={fill} />,
    },
    {
      label: t("comp.addArticleHead.recent"),
      value: 'recent',
      icon: (fill: string) => <RecentIcon fill={fill} />,
    },
    {
      label: t("comp.addArticleHead.mostLiked"),
      value: 'liked',
      icon: (fill: string) => <LikeIcon fill={fill} />,
    },
    // {
    //   label: t("comp.addArticleHead.bookmark"),
    //   value: "bookmark",
    //   icon: (fill: string) => <BookMarkIcon fill={fill} />,
    // }
  ];
  const [value, setValue] = useState('liked?limited=true');
  const [articleTabs, setArticleTabs] = useState(defaultTab);

  const { palette } = useTheme();
  const getColorSvg = itemValue => {
    if (itemValue !== value) {
      return palette?.mode === 'light' ? '#7C93AE' : 'rgba(255, 255, 255, 0.3)';
    }
    return palette?.mode === 'light'
      ? palette.text.primary
      : palette?.primary?.main;
  };

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setTabName(newValue);
    setArticleTabs(defaultTab);
    setDynamicTab({
      searchBy: '',
      value: undefined,
      tagId: '',
    })

  };
  useEffect(() => {
    if (dynamicTabType) {
      setArticleTabs([
        {
          icon: (fill: string) => <SearchIcon fill={fill} />,
          label: '#' + dynamicTab,
          value: dynamicTab,
        },
        ...defaultTab,
      ]);
      setValue(dynamicTab);
      setTabName(dynamicTab);    
    } else {
      setArticleTabs(defaultTab);
      setValue('popular');
      setTabName('popular');
   
    }
  }, [dynamicTab, dynamicTabType]);
  return (
    <>
      <ArticleHeadContainer>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          aria-label="icon position tabs"
        >
          {articleTabs.map((item, index) => (
            <Tab
              key={`articleTab${index}`}
              className="tab"
              icon={item?.icon && item?.icon(getColorSvg(item.value))}
              iconPosition="start"
              value={item.value}
              label={
                <Typography translate="no" variant="subtitle2">
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
          <Link href="/composer/create">
            <GradientButton variant="outlined" color="primary" isSelected>
              <span translate="no">{t("comp.addArticleHead.newArticle")}</span>
            </GradientButton>
          </Link>
        </Box>
      </ArticleHeadContainer>
      <Divider sx={{ color: 'white' }} />
    </>
  );
}
