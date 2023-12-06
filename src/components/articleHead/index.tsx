'use client';

import { Box, Tabs, Tab, Typography, Button, Divider } from '@mui/material';
import React, { useState, SyntheticEvent, useEffect } from 'react';
import { styled } from '@mui/material/styles';

import BookMarkIcon from '@/images/image/bookMarkIcon';
import LikeIcon from '@/images/image/likeIcon';
import RecentIcon from '@/images/image/recentIcon';
import ProfileTickIcon from '@/images/image/profileTick';
import PopularIcon from '@/images/image/popularIcon';
import { useGetArticleListQuery } from '@/lib/redux/slices/articleDetails';

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

export default function ArticleHead({ setArticleList }: any) {
  const [value, setValue] = useState('popular');
  const [tabName, setTabName] = useState('liked?limited=true');

  const { data: articleList } = useGetArticleListQuery(tabName);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (newValue === 'popular') {
      setTabName('liked?limited=true');
    } else {
      setTabName(newValue);
    }
  };

  useEffect(() => {
    if (articleList) setArticleList(articleList || []);
  }, [articleList]);

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
            label={<Typography variant="subtitle2">Popular</Typography>}
            icon={<PopularIcon />}
            iconPosition="start"
            value={'popular'}
          />
          <Tab
            className="tab"
            label={<Typography variant="subtitle2">Following</Typography>}
            icon={<ProfileTickIcon />}
            iconPosition="start"
            value={'following'}
          />
          <Tab
            className="tab"
            label={<Typography variant="subtitle2">Recent</Typography>}
            icon={<RecentIcon />}
            iconPosition="start"
            value={'recent'}
          />
          <Tab
            className="tab"
            label={<Typography variant="subtitle2">Liked</Typography>}
            icon={<LikeIcon />}
            iconPosition="start"
            value={'liked'}
          />
          <Tab
            className="tab"
            label={<Typography variant="subtitle2">Bookmark</Typography>}
            icon={<BookMarkIcon />}
            iconPosition="start"
            value={'bookmark'}
          />
        </Tabs>
        <Button
          variant="outlined"
          color="primary"
          sx={{ border: '1px solid white' }}
        >
          New Articles
        </Button>
      </ArticleHeadContainer>
      <Divider sx={{ color: 'white' }} />
    </>
  );
}
